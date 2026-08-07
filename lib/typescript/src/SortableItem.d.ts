import type { ReactNode } from 'react';
import type { DraxViewProps, SortableListHandle } from './types';
export interface SortableItemProps extends DraxViewProps {
    sortable: SortableListHandle<any>;
    index: number;
    /** When true, this item cannot be dragged and stays in its position.
     *  Other items will skip over it during reorder. */
    fixed?: boolean;
    children: ReactNode;
}
declare const SortableItemInner: ({ sortable, index, fixed, children, ...draxViewProps }: SortableItemProps) => import("react/jsx-runtime").JSX.Element;
export declare const SortableItem: typeof SortableItemInner;
export {};
//# sourceMappingURL=SortableItem.d.ts.map