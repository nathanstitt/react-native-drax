"use strict";

import { useRef } from 'react';
import { useSortableList } from "./hooks/useSortableList.js";
import { SortableContainer } from "./SortableContainer.js";
import { SortableItem } from "./SortableItem.js";
import { jsx as _jsx } from "react/jsx-runtime";
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
export const DraxList = ({
  component: ListComponent,
  ref,
  id,
  data,
  keyExtractor,
  onReorder,
  renderItem,
  reorderStrategy,
  longPressDelay,
  lockToMainAxis,
  animationConfig,
  inactiveItemStyle,
  itemEntering,
  itemExiting,
  itemDraxViewProps,
  containerDraxViewProps,
  containerStyle,
  onDragStart,
  onDragPositionChange,
  onDragEnd,
  style,
  horizontal,
  numColumns,
  ...listProps
}) => {
  const isHorizontal = horizontal ?? false;
  const cols = numColumns ?? 1;
  const sortable = useSortableList({
    id,
    data,
    keyExtractor,
    onReorder,
    horizontal: isHorizontal,
    numColumns: cols,
    reorderStrategy,
    longPressDelay,
    lockToMainAxis,
    animationConfig,
    inactiveItemStyle,
    itemEntering,
    itemExiting,
    onDragStart,
    onDragPositionChange,
    onDragEnd
  });
  const listRef = useRef(null);

  // Forward external ref
  const setRef = instance => {
    listRef.current = instance;
    if (ref) {
      if (typeof ref === 'function') {
        ref(instance);
      } else {
        ref.current = instance;
      }
    }
  };

  // Lazy-load FlatList only when no component is provided.
  // This avoids importing react-native's FlatList at module scope
  // when the consumer uses a different list component.
  const ResolvedList = ListComponent ?? require('react-native').FlatList;
  return /*#__PURE__*/_jsx(SortableContainer, {
    sortable: sortable,
    scrollRef: listRef,
    style: containerStyle,
    draxViewProps: containerDraxViewProps,
    children: /*#__PURE__*/_jsx(ResolvedList, {
      ...listProps,
      style: style,
      ref: setRef,
      horizontal: isHorizontal,
      keyExtractor: sortable.stableKeyExtractor,
      numColumns: cols,
      data: sortable.data,
      onScroll: sortable.onScroll,
      onContentSizeChange: sortable.onContentSizeChange,
      renderItem: info => /*#__PURE__*/_jsx(SortableItem, {
        sortable: sortable,
        index: info.index,
        ...itemDraxViewProps,
        children: renderItem(info)
      })
    })
  });
};
//# sourceMappingURL=DraxList.js.map