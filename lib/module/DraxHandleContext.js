"use strict";

import { createContext } from 'react';
/**
 * Context that passes the drag gesture from a DraxView (with `dragHandle` prop)
 * to its descendant DraxHandle component. When a DraxView has `dragHandle={true}`,
 * it does NOT wrap itself in a GestureDetector. Instead, the gesture is provided
 * via this context so that DraxHandle can attach it to a smaller touch area.
 */
export const DraxHandleContext = /*#__PURE__*/createContext(null);
//# sourceMappingURL=DraxHandleContext.js.map