"use strict";

import { useRef } from 'react';
import Reanimated from 'react-native-reanimated';
import { DraxSubprovider } from "./DraxSubprovider.js";
import { DraxView } from "./DraxView.js";
import { useDraxScrollHandler } from "./hooks/useDraxScrollHandler.js";
import { useWebScrollFreeze } from "./hooks/useWebScrollFreeze.js";
import { defaultAutoScrollBackThreshold, defaultAutoScrollForwardThreshold, defaultAutoScrollJumpRatio, defaultScrollEventThrottle } from "./params.js";
import { AutoScrollDirection } from "./types.js";
import { jsx as _jsx } from "react/jsx-runtime";
export const DraxScrollView = props => {
  const {
    ref,
    children,
    style,
    onContentSizeChange: onContentSizeChangeProp,
    scrollEventThrottle = defaultScrollEventThrottle,
    autoScrollJumpRatio = defaultAutoScrollJumpRatio,
    autoScrollBackThreshold = defaultAutoScrollBackThreshold,
    autoScrollForwardThreshold = defaultAutoScrollForwardThreshold,
    id: idProp,
    ...scrollViewProps
  } = props;

  // Auto-scroll state.
  const autoScrollStateRef = useRef({
    x: AutoScrollDirection.None,
    y: AutoScrollDirection.None
  });

  // Handle auto-scrolling on interval (ref-based to avoid circular deps with useDraxScrollHandler).
  const doScrollRef = useRef(() => {});
  const {
    id,
    containerMeasurementsRef,
    contentSizeRef,
    onContentSizeChange,
    onMeasureContainer,
    onScroll,
    scrollRef,
    scrollPosition,
    setScrollRefs,
    startScroll,
    stopScroll
  } = useDraxScrollHandler({
    idProp,
    onContentSizeChangeProp,
    onScrollProp: props?.onScroll,
    externalRef: ref,
    doScroll: doScrollRef
  });

  // Assign doScroll implementation now that we have scrollRef, measurements, etc.
  doScrollRef.current = () => {
    const scroll = scrollRef.current;
    const containerMeasurements = containerMeasurementsRef.current;
    const contentSize = contentSizeRef.current;
    if (!scroll || !containerMeasurements || !contentSize) return;
    const autoScrollState = autoScrollStateRef.current;
    const jump = {
      x: containerMeasurements.width * autoScrollJumpRatio,
      y: containerMeasurements.height * autoScrollJumpRatio
    };
    let xNew;
    let yNew;
    if (autoScrollState.x === AutoScrollDirection.Forward) {
      const xMax = contentSize.x - containerMeasurements.width;
      if (scrollPosition.value.x < xMax) {
        xNew = Math.min(scrollPosition.value.x + jump.x, xMax);
      }
    } else if (autoScrollState.x === AutoScrollDirection.Back) {
      if (scrollPosition.value.x > 0) {
        xNew = Math.max(scrollPosition.value.x - jump.x, 0);
      }
    }
    if (autoScrollState.y === AutoScrollDirection.Forward) {
      const yMax = contentSize.y - containerMeasurements.height;
      if (scrollPosition.value.y < yMax) {
        yNew = Math.min(scrollPosition.value.y + jump.y, yMax);
      }
    } else if (autoScrollState.y === AutoScrollDirection.Back) {
      if (scrollPosition.value.y > 0) {
        yNew = Math.max(scrollPosition.value.y - jump.y, 0);
      }
    }
    if (xNew !== undefined || yNew !== undefined) {
      // @ts-expect-error Reanimated's type augmentation hides scrollTo, but it exists at runtime
      scroll.scrollTo({
        x: xNew ?? scrollPosition.value.x,
        y: yNew ?? scrollPosition.value.y
      });
      if ('flashScrollIndicators' in scroll && typeof scroll.flashScrollIndicators === 'function') {
        scroll.flashScrollIndicators();
      }
    }
  };
  const {
    freeze: freezeScroll,
    unfreeze: unfreezeScroll
  } = useWebScrollFreeze(scrollRef);

  // Clear auto-scroll direction and stop the auto-scrolling interval.
  const resetScroll = () => {
    const autoScrollState = autoScrollStateRef.current;
    autoScrollState.x = AutoScrollDirection.None;
    autoScrollState.y = AutoScrollDirection.None;
    stopScroll();
    unfreezeScroll();
  };

  // Monitor drag-over events to react with auto-scrolling.
  const onMonitorDragOver = event => {
    const {
      monitorOffsetRatio
    } = event;
    const autoScrollState = autoScrollStateRef.current;
    if (monitorOffsetRatio.x >= autoScrollForwardThreshold) {
      autoScrollState.x = AutoScrollDirection.Forward;
    } else if (monitorOffsetRatio.x <= autoScrollBackThreshold) {
      autoScrollState.x = AutoScrollDirection.Back;
    } else {
      autoScrollState.x = AutoScrollDirection.None;
    }
    if (monitorOffsetRatio.y >= autoScrollForwardThreshold) {
      autoScrollState.y = AutoScrollDirection.Forward;
    } else if (monitorOffsetRatio.y <= autoScrollBackThreshold) {
      autoScrollState.y = AutoScrollDirection.Back;
    } else {
      autoScrollState.y = AutoScrollDirection.None;
    }
    if (autoScrollState.x === AutoScrollDirection.None && autoScrollState.y === AutoScrollDirection.None) {
      stopScroll();
    } else {
      startScroll();
    }
  };
  const scrollViewParent = {
    id,
    viewRef: scrollRef,
    isScrollContainer: true
  };
  return /*#__PURE__*/_jsx(DraxView, {
    id: id,
    style: style,
    scrollPosition: scrollPosition,
    onMeasure: onMeasureContainer,
    onMonitorDragStart: freezeScroll,
    onMonitorDragOver: onMonitorDragOver,
    onMonitorDragExit: resetScroll,
    onMonitorDragEnd: resetScroll,
    onMonitorDragDrop: resetScroll,
    children: /*#__PURE__*/_jsx(DraxSubprovider, {
      parent: scrollViewParent,
      children: /*#__PURE__*/_jsx(Reanimated.ScrollView, {
        ...scrollViewProps,
        // @ts-expect-error — callback ref bridges AnimatedRef + external ref; runtime-compatible
        ref: setScrollRefs,
        onContentSizeChange: onContentSizeChange,
        scrollEventThrottle: scrollEventThrottle,
        onScroll: onScroll,
        children: children
      })
    })
  });
};
//# sourceMappingURL=DraxScrollView.js.map