import type { SortableBoardHandle, UseSortableBoardOptions } from '../types';
/**
 * Board-level coordinator for cross-container sortable drag.
 *
 * Maintains a registry of columns (each with their own useSortableList)
 * and tracks cross-container transfer state. The actual monitor callbacks
 * are handled by SortableBoardContainer.
 */
export declare const useSortableBoard: <TItem>(options: UseSortableBoardOptions<TItem>) => SortableBoardHandle<TItem>;
//# sourceMappingURL=useSortableBoard.d.ts.map