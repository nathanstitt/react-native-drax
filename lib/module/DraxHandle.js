"use strict";

import { use } from 'react';
import { GestureDetector } from 'react-native-gesture-handler';
import Reanimated from 'react-native-reanimated';
import { DraxHandleContext } from "./DraxHandleContext.js";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Drag handle component — only touches on this area will start a drag.
 *
 * Must be a descendant of a `DraxView` that has `dragHandle={true}`.
 * The parent DraxView provides its gesture via context; this component
 * attaches it to the handle's touch area via GestureDetector.
 *
 * @example
 * ```tsx
 * <DraxView dragHandle style={styles.row}>
 *   <DraxHandle style={styles.grip}>
 *     <GripIcon />
 *   </DraxHandle>
 *   <Text>Item content</Text>
 * </DraxView>
 * ```
 */
export function DraxHandle({
  children,
  style
}) {
  const ctx = use(DraxHandleContext);
  if (!ctx) {
    // No context = either misconfigured, or rendering inside hover overlay
    // (which clones children outside the DraxHandleContext tree).
    // Render as a plain view — the gesture isn't needed in hover.
    return /*#__PURE__*/_jsx(Reanimated.View, {
      style: style,
      children: children
    });
  }
  return /*#__PURE__*/_jsx(GestureDetector, {
    gesture: ctx.gesture,
    children: /*#__PURE__*/_jsx(Reanimated.View, {
      style: style,
      children: children
    })
  });
}
//# sourceMappingURL=DraxHandle.js.map