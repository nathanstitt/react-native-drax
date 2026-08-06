import type { ComponentType, ReactNode, Ref } from 'react';
import type { ListRenderItemInfo, StyleProp, ViewStyle } from 'react-native';
import type { EntryOrExitLayoutType } from 'react-native-reanimated';
import type { DraxViewProps, SortableAnimationConfig, SortableDragEndEvent, SortableDragPositionChangeEvent, SortableDragStartEvent, SortableReorderEvent, SortableReorderStrategy } from './types';
export interface DraxListProps<T> {
    /**
     * List component to render. Any component that accepts `data`, `renderItem`,
     * and `keyExtractor` props (FlatList, FlashList, LegendList, etc.).
     * @default FlatList
     */
    component?: ComponentType<any>;
    ref?: Ref<any>;
    /** Optional explicit DraxView id for the container */
    id?: string;
    data: T[];
    keyExtractor: (item: T, index: number) => string;
    onReorder: (event: SortableReorderEvent<T>) => void;
    renderItem: (info: ListRenderItemInfo<T>) => ReactNode;
    /** Reorder strategy. @default 'insert' */
    reorderStrategy?: SortableReorderStrategy;
    /** Long press delay before drag starts in ms. @default 250 */
    longPressDelay?: number;
    /** Lock item drags to the list's main axis. @default false */
    lockToMainAxis?: boolean;
    /** Animation config for item shift animations. @default 'default' */
    animationConfig?: SortableAnimationConfig;
    /** Style applied to all non-dragged items while a drag is active.
     *  Use for dimming/scaling inactive items (e.g., `{ opacity: 0.5 }`). */
    inactiveItemStyle?: ViewStyle;
    /** Reanimated layout animation for items entering the list (e.g., `FadeIn`). */
    itemEntering?: EntryOrExitLayoutType;
    /** Reanimated layout animation for items exiting the list (e.g., `FadeOut`). */
    itemExiting?: EntryOrExitLayoutType;
    /** DraxView props to apply to each item */
    itemDraxViewProps?: Partial<DraxViewProps>;
    /** DraxView props for the container */
    containerDraxViewProps?: Partial<DraxViewProps>;
    /** Style for the container */
    containerStyle?: StyleProp<ViewStyle>;
    /** Style for the list component */
    style?: StyleProp<ViewStyle>;
    /** Horizontal list layout. @default false */
    horizontal?: boolean;
    /** Number of columns (grid layout). @default 1 */
    numColumns?: number;
    /** Callback when drag starts */
    onDragStart?: (event: SortableDragStartEvent<T>) => void;
    /** Callback when drag position changes */
    onDragPositionChange?: (event: SortableDragPositionChangeEvent<T>) => void;
    /** Callback when drag ends */
    onDragEnd?: (event: SortableDragEndEvent<T>) => void;
}
/**
 * List-agnostic sortable list component.
 *
 * Wraps any list component (FlatList, FlashList, LegendList, etc.) with
 * drag-and-drop reordering powered by `useSortableList` + `SortableContainer` + `SortableItem`.
 *
 * For full control, use the composable API directly:
 * `useSortableList` + `SortableContainer` + `SortableItem`.
 *
 * Any extra props beyond the ones defined in `DraxListProps` are forwarded
 * to the underlying list component (e.g. `estimatedItemSize` for FlashList).
 */
export declare const DraxList: <T>({ component: ListComponent, ref, id, data, keyExtractor, onReorder, renderItem, reorderStrategy, longPressDelay, lockToMainAxis, animationConfig, inactiveItemStyle, itemEntering, itemExiting, itemDraxViewProps, containerDraxViewProps, containerStyle, onDragStart, onDragPositionChange, onDragEnd, style, horizontal, numColumns, ...listProps }: DraxListProps<T> & Record<string, any>) => ReactNode;
//# sourceMappingURL=DraxList.d.ts.map