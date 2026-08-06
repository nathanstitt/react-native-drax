"use strict";

import { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { DebugOverlay } from "./DebugOverlay.js";
import { DraxContext } from "./DraxContext.js";
import { HoverLayer } from "./HoverLayer.js";
import { useCallbackDispatch } from "./hooks/useCallbackDispatch.js";
import { useSpatialIndex } from "./hooks/useSpatialIndex.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const DraxProvider = ({
  style = styles.provider,
  debug = false,
  onDragStart: onProviderDragStart,
  onDrag: onProviderDrag,
  onDragEnd: onProviderDragEnd,
  children
}) => {
  // ── Split SharedValues (by update frequency) ───────────────────────
  // Changes ~2x per drag. Read by all DraxView useAnimatedStyle.
  const draggedIdSV = useSharedValue('');
  // Changes ~3-5x per drag. Read by all DraxView useAnimatedStyle.
  const receiverIdSV = useSharedValue('');
  // Changes ~3x per drag. Read by all DraxView useAnimatedStyle.
  const dragPhaseSV = useSharedValue('idle');
  // Changes every frame during drag. Read ONLY by HoverLayer (1 component).
  const hoverPositionSV = useSharedValue({
    x: 0,
    y: 0
  });
  // Changes every frame during drag. Used by gesture worklet for hit-testing.
  // NOT read by any useAnimatedStyle.
  const dragAbsolutePositionSV = useSharedValue({
    x: 0,
    y: 0
  });
  // ID of the most recently rejected receiver. Read by gesture worklet to skip
  // re-detecting the same rejected receiver. Cleared when drag leaves its bounds.
  const rejectedReceiverIdSV = useSharedValue('');
  // Set once per drag start.
  const grabOffsetSV = useSharedValue({
    x: 0,
    y: 0
  });
  const startPositionSV = useSharedValue({
    x: 0,
    y: 0
  });
  // Screen offset of the root view (measured on layout).
  const rootOffsetSV = useSharedValue({
    x: 0,
    y: 0
  });
  // True after hover content is committed to DOM. False after snap completes.
  const hoverReadySV = useSharedValue(false);
  // Set by SortableContainer.finalizeDrag to defer hover clearing to useLayoutEffect.
  const hoverClearDeferredRef = useRef(false);
  // Animated dimensions for hover content during cross-container transfer.
  // x = width, y = height. {0,0} = no constraint (natural size).
  const hoverDimsSV = useSharedValue({
    x: 0,
    y: 0
  });

  // ── Dropped items tracking ─────────────────────────────────────────
  const droppedItemsRef = useRef(new Map());

  // ── Spatial index + registry ───────────────────────────────────────
  const {
    spatialIndexSV,
    scrollOffsetsSV,
    registerView,
    unregisterView,
    updateMeasurements,
    updateScrollOffset,
    updateViewProps,
    getViewEntry
  } = useSpatialIndex();

  // ── Hover content (ref-based to avoid provider re-renders) ─────────
  // Store content in a ref so changing it doesn't re-render the entire tree.
  // Only HoverLayer re-renders via the version counter.
  const hoverContentRef = useRef(null);
  const hoverStylesRef = useRef(null);
  const [hoverVersion, setHoverVersion] = useState(0);
  const setHoverContent = useCallback(content => {
    hoverContentRef.current = content;
    if (content === null) {
      hoverStylesRef.current = null;
    }
    setHoverVersion(v => v + 1);
  }, []);

  // ── Callback dispatch ──────────────────────────────────────────────
  const {
    handleDragStart,
    handleReceiverChange,
    handleDragEnd
  } = useCallbackDispatch({
    getViewEntry,
    spatialIndexSV,
    scrollOffsetsSV,
    draggedIdSV,
    receiverIdSV,
    rejectedReceiverIdSV,
    dragPhaseSV,
    hoverPositionSV,
    grabOffsetSV,
    startPositionSV,
    setHoverContent,
    hoverReadySV,
    hoverClearDeferredRef,
    hoverStylesRef,
    onProviderDragStart,
    onProviderDrag,
    onProviderDragEnd,
    droppedItemsRef
  });

  // ── Root view ref ──────────────────────────────────────────────────
  const rootViewRef = useRef(null);
  const setRootViewRef = ref => {
    rootViewRef.current = ref;
  };

  // Measure root view's screen position on layout
  const handleRootLayout = useCallback(() => {
    const view = rootViewRef.current;
    if (view) {
      view.measure((_x, _y, _w, _h, pageX, pageY) => {
        rootOffsetSV.value = {
          x: pageX,
          y: pageY
        };
      });
    }
  }, [rootOffsetSV]);

  // ── Stable context value ───────────────────────────────────────────
  const contextValue = useMemo(() => ({
    // SharedValues
    draggedIdSV,
    receiverIdSV,
    dragPhaseSV,
    hoverPositionSV,
    dragAbsolutePositionSV,
    rejectedReceiverIdSV,
    spatialIndexSV,
    scrollOffsetsSV,
    grabOffsetSV,
    startPositionSV,
    rootOffsetSV,
    hoverReadySV,
    hoverClearDeferredRef,
    hoverDimsSV,
    // Registry methods
    registerView,
    unregisterView,
    updateMeasurements,
    updateScrollOffset,
    updateViewProps,
    getViewEntry,
    // Callback dispatch
    handleDragStart,
    handleReceiverChange,
    handleDragEnd,
    // Hover content
    setHoverContent,
    // Dropped items
    droppedItemsRef,
    // Refs
    rootViewRef
  }), [draggedIdSV, receiverIdSV, dragPhaseSV, hoverPositionSV, dragAbsolutePositionSV, rejectedReceiverIdSV, spatialIndexSV, scrollOffsetsSV, grabOffsetSV, startPositionSV, rootOffsetSV, hoverReadySV, hoverClearDeferredRef, hoverDimsSV, registerView, unregisterView, updateMeasurements, updateScrollOffset, updateViewProps, getViewEntry, handleDragStart, handleReceiverChange, handleDragEnd, setHoverContent, droppedItemsRef]);
  return /*#__PURE__*/_jsx(DraxContext, {
    value: contextValue,
    children: /*#__PURE__*/_jsxs(View, {
      style: style,
      ref: setRootViewRef,
      onLayout: handleRootLayout,
      collapsable: false,
      children: [children, debug && /*#__PURE__*/_jsx(DebugOverlay, {
        spatialIndexSV: spatialIndexSV,
        scrollOffsetsSV: scrollOffsetsSV
      }), /*#__PURE__*/_jsx(HoverLayer, {
        hoverContentRef: hoverContentRef,
        hoverVersion: hoverVersion,
        hoverPositionSV: hoverPositionSV,
        dragPhaseSV: dragPhaseSV,
        receiverIdSV: receiverIdSV,
        hoverReadySV: hoverReadySV,
        hoverDimsSV: hoverDimsSV,
        hoverStylesRef: hoverStylesRef
      })]
    })
  });
};
const styles = StyleSheet.create({
  provider: {
    flex: 1
  }
});
//# sourceMappingURL=DraxProvider.js.map