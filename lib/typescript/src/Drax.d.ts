import { DraxHandle } from './DraxHandle';
/**
 * Namespace object for convenient access to all Drax components.
 *
 * @example
 * ```tsx
 * import { Drax } from 'react-native-drax';
 *
 * <Drax.Provider>
 *   <Drax.View draggable>
 *     <Drax.Handle><GripIcon /></Drax.Handle>
 *   </Drax.View>
 * </Drax.Provider>
 * ```
 */
export declare const Drax: {
    readonly Handle: typeof DraxHandle;
    readonly List: <T>({ component: ListComponent, ref, id, data, keyExtractor, onReorder, renderItem, reorderStrategy, longPressDelay, lockToMainAxis, animationConfig, inactiveItemStyle, itemEntering, itemExiting, itemDraxViewProps, containerDraxViewProps, containerStyle, onDragStart, onDragPositionChange, onDragEnd, style, horizontal, numColumns, ...listProps }: import("./DraxList").DraxListProps<T> & Record<string, any>) => import("react").ReactNode;
    readonly Provider: ({ style, debug, onDragStart: onProviderDragStart, onDrag: onProviderDrag, onDragEnd: onProviderDragEnd, children, }: import("./types").DraxProviderProps) => import("react").ReactNode;
    readonly ScrollView: (props: import("react").PropsWithChildren<import("./types").DraxScrollViewProps> & {
        ref?: import("react").Ref<import("react-native").ScrollView>;
    }) => import("react").JSX.Element;
    readonly View: import("react").MemoExoticComponent<(props: import("./types").DraxViewProps) => import("react").ReactNode>;
    readonly SortableBoardContainer: <TItem>({ board, style, children, draxViewProps, }: import("./SortableBoardContainer").SortableBoardContainerProps<TItem>) => import("react").JSX.Element;
    readonly SortableContainer: ({ sortable, scrollRef, style, children, draxViewProps, renderDropIndicator, }: import("./SortableContainer").SortableContainerProps) => import("react").JSX.Element;
    readonly SortableItem: ({ sortable, index, fixed, children, ...draxViewProps }: import("./SortableItem").SortableItemProps) => import("react").JSX.Element;
};
//# sourceMappingURL=Drax.d.ts.map