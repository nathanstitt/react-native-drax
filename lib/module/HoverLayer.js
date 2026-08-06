"use strict";

import { memo, useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated';
import { runOnUI } from 'react-native-worklets';

/** Flattened hover styles for the currently dragged view */
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Single hover layer component that renders the hover content during drag.
 *
 * This is the ONLY component that reads hoverPositionSV (changes every frame).
 * All other DraxViews read draggedIdSV/receiverIdSV/dragPhaseSV which change ~5x per drag.
 *
 * Content is passed via ref to avoid re-rendering the entire DraxProvider tree.
 * Only this component re-renders when hover content changes (via hoverVersion).
 */
export const HoverLayer = /*#__PURE__*/memo(({
  hoverContentRef,
  hoverVersion,
  hoverPositionSV,
  dragPhaseSV,
  receiverIdSV,
  hoverReadySV,
  hoverDimsSV,
  hoverStylesRef
}) => {
  // After hover content is committed to the DOM, activate drag phase + signal readiness.
  // dragPhaseSV is NOT set in the gesture handler — it's set HERE, ensuring:
  //   1. HoverLayer becomes visible (opacity 1) only AFTER content is rendered
  //   2. SortableItem hides only AFTER hover is visible (reads hoverReadySV)
  // Both writes happen in the same runOnUI call → same UI frame → no blink.
  useLayoutEffect(() => {
    if (hoverContentRef.current != null) {
      runOnUI((_dragPhaseSV, _hoverReadySV) => {
        'worklet';

        _dragPhaseSV.value = 'dragging';
        _hoverReadySV.value = true;
      })(dragPhaseSV, hoverReadySV);
    }
  }, [hoverVersion]);

  // Read hover styles from ref in the component body — they're captured by the
  // worklet closure when the component re-renders (on hoverVersion change).
  // This ensures the latest styles are available without SharedValues.
  const hs = hoverStylesRef.current;
  const flatHoverStyle = hs?.hoverStyle ?? null;
  const flatHoverDraggingStyle = hs?.hoverDraggingStyle ?? null;
  const flatHoverDraggingWithReceiverStyle = hs?.hoverDraggingWithReceiverStyle ?? null;
  const flatHoverDraggingWithoutReceiverStyle = hs?.hoverDraggingWithoutReceiverStyle ?? null;
  const flatHoverDragReleasedStyle = hs?.hoverDragReleasedStyle ?? null;

  // Position style: applied to the outer full-screen container.
  // Only handles positioning (translate) and visibility (opacity).
  const positionStyle = useAnimatedStyle(() => {
    const phase = dragPhaseSV.value;
    if (phase === 'idle') {
      return {
        opacity: 0
      };
    }
    return {
      opacity: 1,
      transform: [{
        translateX: hoverPositionSV.value.x
      }, {
        translateY: hoverPositionSV.value.y
      }]
    };
  });

  // Visual style: applied to the inner content wrapper.
  // Handles user hover styles (border, shadow, scale, rotate, etc.)
  // so they apply to the content bounds, not the full-screen container.
  const visualStyle = useAnimatedStyle(() => {
    const phase = dragPhaseSV.value;
    if (phase === 'idle') {
      return {};
    }
    let hoverStyles;
    if (phase === 'dragging') {
      const hasReceiver = receiverIdSV.value !== '';
      hoverStyles = {
        ...(flatHoverStyle ?? {}),
        ...(flatHoverDraggingStyle ?? {}),
        ...(hasReceiver ? flatHoverDraggingWithReceiverStyle ?? {} : flatHoverDraggingWithoutReceiverStyle ?? {})
      };
    } else {
      // phase === 'releasing'
      hoverStyles = {
        ...(flatHoverStyle ?? {}),
        ...(flatHoverDragReleasedStyle ?? flatHoverDraggingStyle ?? {})
      };
    }

    // User transforms (rotate, scale, etc.) stay on the content wrapper.
    const {
      transform: userTransform,
      ...restStyles
    } = hoverStyles;
    return {
      ...restStyles,
      ...(userTransform ? {
        transform: userTransform
      } : {})
    };
  });

  // Animated dimensions for the inner content wrapper.
  // When hoverDimsSV is non-zero, constrains hover content to those dimensions
  // so cross-container transfers animate smoothly from source to target size.
  const dimensionStyle = useAnimatedStyle(() => {
    const dims = hoverDimsSV.value;
    if (dims.x > 0 && dims.y > 0) {
      return {
        width: dims.x,
        height: dims.y
      };
    }
    return {};
  });

  // Always render the Reanimated.View — never conditionally unmount it.
  // If we returned null when content is empty, remounting causes a one-frame
  // flash (the view renders at default position before useAnimatedStyle kicks in).
  return /*#__PURE__*/_jsx(Reanimated.View, {
    style: [styles.container, positionStyle],
    pointerEvents: "none",
    children: /*#__PURE__*/_jsx(Reanimated.View, {
      style: [styles.content, dimensionStyle, visualStyle],
      children: hoverContentRef.current
    })
  });
});
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // Default hidden — useAnimatedStyle overrides to opacity:1 when dragging.
    // Prevents a one-frame flash on first mount before the animated style evaluates.
    opacity: 0,
    transformOrigin: 'top left'
  },
  content: {
    // Shrink-wrap to content width — without this the inner view stretches
    // to fill the full-screen absolute parent, causing hover styles (border,
    // shadow) to render at screen width instead of content width.
    alignSelf: 'flex-start'
  }
});
//# sourceMappingURL=HoverLayer.js.map