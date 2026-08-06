import type { SortableListHandle, UseSortableListOptions } from '../types';
/**
 * Core hook for list-agnostic sortable reordering.
 *
 * During drag, order changes are tracked in a ref (no React re-render)
 * and items are visually repositioned via shift transforms (SharedValues).
 * The data reorder is committed to state only on drop, while the hover
 * view covers any layout transition.
 */
export declare const useSortableList: <T>(options: UseSortableListOptions<T>) => SortableListHandle<T>;
//# sourceMappingURL=useSortableList.d.ts.map