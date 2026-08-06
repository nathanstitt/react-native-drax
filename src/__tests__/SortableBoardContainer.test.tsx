import { create, act } from 'react-test-renderer';
import { SortableBoardContainer } from '../SortableBoardContainer';
import type { SortableBoardHandle, SortableListInternal } from '../types';

// Capture the DraxView props so the test can invoke the board's monitor
// callbacks directly — the real DraxView would drag in gesture-handler and
// reanimated internals that are irrelevant to the board's event handling.
let mockDraxViewProps: any;
jest.mock('../DraxView', () => ({
  DraxView: (props: any) => {
    mockDraxViewProps = props;
    return null;
  },
}));

jest.mock('../hooks/useDraxContext', () => ({
  useDraxContext: () => ({
    hoverClearDeferredRef: { current: false },
    draggedIdSV: { value: '' },
    hoverReadySV: { value: false },
    dragPhaseSV: { value: 'idle' },
    hoverPositionSV: { value: { x: 0, y: 0 } },
    hoverDimsSV: { value: { x: 0, y: 0 } },
    setHoverContent: () => {},
  }),
}));

jest.mock('react-native-reanimated', () => ({
  withDelay: (_delay: number, value: unknown) => value,
  withTiming: (value: unknown) => value,
}));

jest.mock('react-native-worklets', () => ({
  runOnJS:
    (fn: (...args: unknown[]) => unknown) =>
    (...args: unknown[]) =>
      fn(...args),
  runOnUI:
    (fn: (...args: unknown[]) => unknown) =>
    (...args: unknown[]) =>
      fn(...args),
}));

const PHANTOM_SNAP = { x: 111, y: 222 };

function makeColumn(bounds: { x: number; y: number; width: number; height: number }) {
  return {
    containerMeasurementsRef: { current: bounds },
    scrollPosition: { value: { x: 0, y: 0 } },
    rawData: [{ id: 'card-a' }],
    keyExtractor: (item: { id: string }) => item.id,
    committedOrderRef: { current: [] as number[] },
    originalIndexes: [0],
    pendingOrderRef: { current: [] as number[] },
    draggedDisplayIndexRef: { current: undefined },
    dragStartIndexRef: { current: undefined },
    phantomRef: { current: undefined },
    itemMeasurements: { current: new Map() },
    draggedItem: { value: -1 },
    shiftsRef: { value: {} },
    ejectDraggedItem: jest.fn(),
    reinjectDraggedItem: jest.fn(),
    setPhantomSlot: jest.fn(),
    clearPhantomSlot: jest.fn(),
    getSlotFromPosition: jest.fn(() => 0),
    getPhantomSnapTarget: jest.fn(() => PHANTOM_SNAP),
  } as unknown as SortableListInternal<unknown> & Record<string, jest.Mock>;
}

function makeBoard() {
  const columns = new Map<string, SortableListInternal<unknown>>();
  const internal = {
    keyExtractor: (card: { id: string }) => card.id,
    onTransfer: jest.fn(),
    columns,
    registerColumn: (id: string, column: SortableListInternal<unknown>) =>
      columns.set(id, column),
    unregisterColumn: (id: string) => columns.delete(id),
    transferState: { current: undefined as unknown },
    finalizeTransfer: undefined as (() => void) | undefined,
  };
  return { board: { _internal: internal } as unknown as SortableBoardHandle<unknown>, internal };
}

/** Drive a drag from the source column over the target column. */
function startCrossDrag(source: ReturnType<typeof makeColumn>) {
  const dragged = {
    parentId: 'source',
    payload: { index: 0, originalIndex: 0 },
    measurements: { width: 100, height: 40 },
  };
  act(() => {
    mockDraxViewProps.onMonitorDragStart({ dragged });
    // Position inside the target column's bounds.
    mockDraxViewProps.onMonitorDragOver({
      dragged,
      dragAbsolutePosition: { x: 250, y: 50 },
    });
  });
  expect(source.ejectDraggedItem).toHaveBeenCalled();
}

function renderBoard() {
  const { board, internal } = makeBoard();
  const source = makeColumn({ x: 0, y: 0, width: 100, height: 500 });
  const target = makeColumn({ x: 200, y: 0, width: 100, height: 500 });
  let renderer!: ReturnType<typeof create>;
  act(() => {
    renderer = create(
      <SortableBoardContainer board={board}>{null}</SortableBoardContainer>
    );
  });
  internal.registerColumn('source', source);
  internal.registerColumn('target', target);
  return { internal, source, target, renderer };
}

describe('SortableBoardContainer cross-container drag end', () => {
  it('commits the transfer on a successful drop', () => {
    const { internal, source, target } = renderBoard();
    startCrossDrag(source);
    expect((internal.transferState.current as any)?.targetId).toBe('target');
    expect(target.setPhantomSlot).toHaveBeenCalled();

    let response: unknown;
    act(() => {
      response = mockDraxViewProps.onMonitorDragEnd({ cancelled: false });
    });
    // Snaps to the phantom slot, keeps the transfer for finalizeTransfer.
    expect(response).toEqual(PHANTOM_SNAP);
    expect(source.reinjectDraggedItem).not.toHaveBeenCalled();
    expect((internal.transferState.current as any)?.targetId).toBe('target');

    // finalizeTransfer (normally run at snap end) delivers onTransfer.
    const raf = jest
      .spyOn(globalThis, 'requestAnimationFrame')
      .mockImplementation((cb: (time: number) => void) => {
        cb(0);
        return 0;
      });
    act(() => {
      internal.finalizeTransfer?.();
    });
    raf.mockRestore();
    expect(internal.onTransfer).toHaveBeenCalledWith(
      expect.objectContaining({ fromContainerId: 'source', toContainerId: 'target' })
    );
  });

  it('ignores the stale cancelled drag-end that released gesture-handler 3.x emits after a successful drop', () => {
    // Regression: RNGH >= 3.0.1 (web) finalizes a normally-ended pan with
    // didSucceed=false, dispatching a second, cancelled drag-end. The
    // cancel branch used to reinject the item at its origin — every
    // cross-container drop silently reverted.
    const { internal, source, target } = renderBoard();
    startCrossDrag(source);

    act(() => {
      mockDraxViewProps.onMonitorDragEnd({ cancelled: false });
    });

    let staleResponse: unknown;
    act(() => {
      staleResponse = mockDraxViewProps.onMonitorDragEnd({ cancelled: true });
    });

    // The stale event must not undo the drop…
    expect(source.reinjectDraggedItem).not.toHaveBeenCalled();
    expect(target.clearPhantomSlot).not.toHaveBeenCalled();
    expect((internal.transferState.current as any)?.targetId).toBe('target');
    // …and must keep the snap aimed at the phantom slot, not the origin
    // (an undefined response resolves to the default snap target — the
    // dragged view's original position — visibly flying the card home).
    expect(staleResponse).toEqual(PHANTOM_SNAP);

    // The transfer still commits afterwards.
    const raf = jest
      .spyOn(globalThis, 'requestAnimationFrame')
      .mockImplementation((cb: (time: number) => void) => {
        cb(0);
        return 0;
      });
    act(() => {
      internal.finalizeTransfer?.();
    });
    raf.mockRestore();
    expect(internal.onTransfer).toHaveBeenCalledTimes(1);
  });

  it('still reverts a genuine mid-drag cancel', () => {
    // A real cancel arrives BEFORE any successful drag-end, while the
    // source info is still live — the guard must not swallow it.
    const { internal, source, target } = renderBoard();
    startCrossDrag(source);

    act(() => {
      mockDraxViewProps.onMonitorDragEnd({ cancelled: true });
    });

    expect(target.clearPhantomSlot).toHaveBeenCalled();
    expect(source.reinjectDraggedItem).toHaveBeenCalledWith(0, 0);
    expect(internal.transferState.current).toBeUndefined();
    expect(internal.onTransfer).not.toHaveBeenCalled();
  });
});
