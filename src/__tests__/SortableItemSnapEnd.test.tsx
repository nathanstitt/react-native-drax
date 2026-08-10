import { act, create } from 'react-test-renderer';
import { SortableItem } from '../SortableItem';
import type { SortableListHandle } from '../types';

// Capture the DraxView props so the test can invoke onSnapEnd directly —
// the real DraxView would drag in gesture-handler and reanimated internals
// that are irrelevant to the snap-end dispatch under test.
let mockDraxViewProps: any;
jest.mock('../DraxView', () => ({
  DraxView: (props: any) => {
    mockDraxViewProps = props;
    return null;
  },
}));

jest.mock('../hooks/useDraxContext', () => ({
  useDraxContext: () => ({
    hoverReadySV: { value: false },
    draggedIdSV: { value: '' },
  }),
}));

jest.mock('react-native-reanimated', () => {
  const View = (props: any) => props.children ?? null;
  return {
    __esModule: true,
    default: { View },
    useAnimatedStyle: (_fn: () => unknown) => ({}),
    useDerivedValue: (fn: () => unknown) => ({ value: fn() }),
    useSharedValue: (initial: unknown) => ({ value: initial }),
    useReducedMotion: () => true,
    Easing: { linear: (v: number) => v },
    withSpring: (v: unknown) => v,
    withTiming: (v: unknown) => v,
  };
});

/**
 * Regression: the snap-end dispatch must resolve onItemSnapEnd at CALL time.
 *
 * useSortableList rebuilds _internal as a fresh object literal on every
 * render, with onItemSnapEnd initialized to undefined; SortableContainer
 * patches it in a useLayoutEffect AFTER the render pass. A SortableItem that
 * renders in the same pass therefore sees onItemSnapEnd === undefined during
 * render — and a render-time destructure freezes that undefined into the
 * registered onSnapEnd closure. A drop whose snap animation completes before
 * the item's next render then commits nothing: finalizeDrag is never called,
 * the reorder is silently lost, and the list is left stuck mid-shift.
 */
function makeHandle(): SortableListHandle<{ id: string }> {
  const internal = {
    id: 'sortable-under-test',
    horizontal: false,
    lockToMainAxis: false,
    longPressDelay: 0,
    animationConfig: 'default',
    inactiveItemStyle: undefined,
    itemEntering: undefined,
    itemExiting: undefined,
    shiftsRef: { value: {} },
    instantClearSV: { value: false },
    shiftsValidSV: { value: true },
    itemMeasurements: { current: new Map() },
    keyExtractor: (item: { id: string }) => item.id,
    rawData: [{ id: 'row-a' }],
    originalIndexes: [0],
    scrollPosition: { value: { x: 0, y: 0 } },
    // The state under test: not yet patched by SortableContainer's effect.
    onItemSnapEnd: undefined as (() => void) | undefined,
    fixedKeys: { current: new Set<string>() },
  };
  return { _internal: internal } as unknown as SortableListHandle<{ id: string }>;
}

describe('SortableItem snap-end dispatch', () => {
  it('calls the onItemSnapEnd assigned AFTER the item rendered', () => {
    const sortable = makeHandle();

    let renderer: ReturnType<typeof create>;
    act(() => {
      renderer = create(
        <SortableItem sortable={sortable} index={0}>
          {null}
        </SortableItem>
      );
    });
    expect(mockDraxViewProps?.onSnapEnd).toBeDefined();

    // SortableContainer's useLayoutEffect runs after the item rendered —
    // exactly the ordering that left the render-time destructure undefined.
    const finalize = jest.fn();
    sortable._internal.onItemSnapEnd = finalize;

    act(() => {
      mockDraxViewProps.onSnapEnd({ dragged: { id: 'x', parentId: 'p' } });
    });

    expect(finalize).toHaveBeenCalledTimes(1);
    act(() => renderer!.unmount());
  });
});
