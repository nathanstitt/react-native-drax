import type { DraxViewMeasurements, GridItemSpan, HitTestResult, Position, SpatialEntry, ViewDimensions } from './types';
export declare const getRelativePosition: ({ x, y }: Position, { width, height, x: x0, y: y0 }: DraxViewMeasurements) => {
    relativePosition: {
        x: number;
        y: number;
    };
    relativePositionRatio: {
        x: number;
        y: number;
    };
};
export declare const generateRandomId: () => string;
/**
 * Compute the absolute position of a spatial entry by walking the parent chain.
 * Accounts for scroll offsets at each level.
 */
export declare const computeAbsolutePositionWorklet: (entryIndex: number, entries: SpatialEntry[], scrollOffsets: Position[]) => Position;
/**
 * Hit-test all views in the spatial index against a given absolute position.
 * Runs entirely on the UI thread as a worklet.
 * Returns the deepest receptive view and all monitoring views that contain the point.
 *
 * @param position - Center of the hover view (absolute)
 * @param entries - Spatial index entries
 * @param scrollOffsets - Scroll offsets per entry
 * @param excludeId - ID of the dragged view (excluded from hit-testing)
 * @param draggedDimensions - Optional dimensions of the dragged view (needed for intersect/contain)
 */
export declare const hitTestWorklet: (position: Position, entries: SpatialEntry[], scrollOffsets: Position[], excludeId: string, draggedDimensions?: ViewDimensions) => HitTestResult;
/** Named alignment positions for snap targets within a receiver */
export type SnapAlignment = 'center' | 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
/**
 * Compute a snap target position that aligns a dragged view within a receiver
 * at the specified alignment point, with an optional pixel offset.
 *
 * Use as the return value from onDragDrop/onReceiveDragDrop/onMonitorDragDrop:
 * ```
 * onReceiveDragDrop={({ dragged, receiver }) =>
 *   snapToAlignment(receiver.measurements, dragged.measurements, 'top-left', { x: 8, y: 8 })
 * }
 * ```
 */
export declare const snapToAlignment: (receiver: {
    x: number;
    y: number;
    width: number;
    height: number;
}, dragged: {
    width: number;
    height: number;
} | undefined, alignment?: SnapAlignment, offset?: Position) => Position;
/** Result of packing items into a grid */
export interface GridPackResult {
    /** Grid position (row, col) for each item, in input order */
    positions: {
        row: number;
        col: number;
    }[];
    /** Total number of rows in the packed grid */
    totalRows: number;
}
/**
 * Pack items into a grid with the given number of columns.
 * Items are placed left-to-right, top-to-bottom, filling the first
 * available position where the item's span fits.
 *
 * This is the same algorithm used by mobile home screens: scan cells
 * in reading order and place each item at the first slot that can
 * accommodate its colSpan × rowSpan.
 *
 * @param count Number of items to pack
 * @param numColumns Number of columns in the grid
 * @param getSpan Returns the span for the item at the given index
 */
export declare function packGrid(count: number, numColumns: number, getSpan: (index: number) => GridItemSpan): GridPackResult;
//# sourceMappingURL=math.d.ts.map