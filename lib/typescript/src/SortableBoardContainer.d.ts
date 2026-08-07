import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { DraxViewProps, SortableBoardHandle } from './types';
export interface SortableBoardContainerProps<TItem = unknown> {
    board: SortableBoardHandle<TItem>;
    style?: StyleProp<ViewStyle>;
    children: ReactNode;
    draxViewProps?: Partial<DraxViewProps>;
}
export declare const SortableBoardContainer: <TItem>({ board, style, children, draxViewProps, }: SortableBoardContainerProps<TItem>) => import("react").JSX.Element;
//# sourceMappingURL=SortableBoardContainer.d.ts.map