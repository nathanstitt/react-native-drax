import type { ReactNode, RefObject } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { DropIndicatorProps, DraxViewProps, SortableListHandle } from './types';
export interface SortableContainerProps {
    sortable: SortableListHandle<any>;
    scrollRef: RefObject<any>;
    style?: StyleProp<ViewStyle>;
    children: ReactNode;
    draxViewProps?: Partial<DraxViewProps>;
    renderDropIndicator?: (props: DropIndicatorProps) => ReactNode;
}
export declare const SortableContainer: ({ sortable, scrollRef, style, children, draxViewProps, renderDropIndicator, }: SortableContainerProps) => import("react").JSX.Element;
//# sourceMappingURL=SortableContainer.d.ts.map