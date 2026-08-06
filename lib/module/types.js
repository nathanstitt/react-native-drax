"use strict";

// ─── Core Geometry Types ───────────────────────────────────────────────────

/** An xy-coordinate position value */

/** Predicate for checking if something is a Position */
export const isPosition = something => typeof something === 'object' && something !== null && 'x' in something && 'y' in something && typeof something.x === 'number' && typeof something.y === 'number';

/** Dimensions of a view */

/** Grid span for a sortable item (columns and rows it occupies) */

/** Measurements of a Drax view for bounds checking purposes */

// ─── Drag Phase & Status Types ─────────────────────────────────────────────

/** Phase of a drag operation — drives all animated styles */

/** The states a dragged view can be in */
export let DraxViewDragStatus = /*#__PURE__*/function (DraxViewDragStatus) {
  DraxViewDragStatus[DraxViewDragStatus["Inactive"] = 0] = "Inactive";
  DraxViewDragStatus[DraxViewDragStatus["Dragging"] = 1] = "Dragging";
  DraxViewDragStatus[DraxViewDragStatus["Released"] = 2] = "Released";
  return DraxViewDragStatus;
}({});

/** The states a receiver view can be in */
export let DraxViewReceiveStatus = /*#__PURE__*/function (DraxViewReceiveStatus) {
  DraxViewReceiveStatus[DraxViewReceiveStatus["Inactive"] = 0] = "Inactive";
  DraxViewReceiveStatus[DraxViewReceiveStatus["Receiving"] = 1] = "Receiving";
  return DraxViewReceiveStatus;
}({});

// ─── Collision Algorithm ────────────────────────────────────────────────────

/** Algorithm used to determine if a dragged view is over a receiver */

// ─── Spatial Index (SharedValue, UI Thread) ────────────────────────────────

/** Entry in the spatial index SharedValue, accessed from worklets for hit-testing */

/** Result of a UI-thread hit test */

// ─── Event Data Types (Public API) ─────────────────────────────────────────

/** Data about a view involved in a Drax event */

/** Data about a dragged view involved in a Drax event */

/** Data about a receiver view involved in a Drax event */

/** Data about a Drax drag event */

/** Supplemental type for adding a cancelled flag */

/** Predicate for checking if something has a cancelled flag */
export const isWithCancelledFlag = something => typeof something === 'object' && something !== null && 'cancelled' in something && typeof something.cancelled === 'boolean';

/** Data about a Drax drag end event */

/** Data about a Drax drag event that involves a receiver */

/** Data about a Drax drag/receive end event */

/** Data about a Drax monitor event */

/** Data about a Drax monitor drag end event */

/** Data about a Drax monitor drag-drop event */

// ─── Snap Types ────────────────────────────────────────────────────────────

/** Preset values for specifying snap targets without a Position */
export let DraxSnapbackTargetPreset = /*#__PURE__*/function (DraxSnapbackTargetPreset) {
  DraxSnapbackTargetPreset[DraxSnapbackTargetPreset["Default"] = 0] = "Default";
  DraxSnapbackTargetPreset[DraxSnapbackTargetPreset["None"] = 1] = "None";
  return DraxSnapbackTargetPreset;
}({});

/** Target for snap hover view release animation: none, default, or specified Position */

/** Response type for drag end callbacks, allowing override of default release snap behavior */

/** Data about a Drax snap, used for custom animations */

/** Data passed to onSnapEnd and onReceiveSnapEnd callbacks */

// ─── Render Content Props ──────────────────────────────────────────────────

/** Simplified view state for render content props */

/** Tracking status indicating whether anything is being dragged/received */

/** Props provided to a render function for a Drax view */

/** Props provided to a render function for a hovering copy of a Drax view */

// ─── Style Types ───────────────────────────────────────────────────────────

/** Style prop for DraxView drag/receive states (flattened for worklets) */

/** Style prop for hover views (supports animated styles) */

/** Style-related props for a Drax view */

// ─── Custom render functions ───────────────────────────────────────────────

/** Custom render function for content of a DraxView */

/** Custom render function for content of hovering copy of a DraxView */

// ─── View Props ────────────────────────────────────────────────────────────

/** Props for a DraxView */

// ─── View Registry (JS Thread) ─────────────────────────────────────────────

/** Entry in the JS-thread view registry Map */

// ─── Context Value ─────────────────────────────────────────────────────────

/** Context value used internally by Drax provider */

/** Payload for registering a Drax view */

// ─── Provider / Subprovider Props ──────────────────────────────────────────

/** Event data for provider-level drag callbacks */

/** Optional props that can be passed to a DraxProvider */

/** Props that are passed to a DraxSubprovider */

// ─── External Registration ─────────────────────────────────────────────────

/** Methods provided by a DraxView when registered externally */

/** Information about the parent of a nested DraxView */

/** Function that receives a Drax view measurement */

// ─── Auto-scroll Types ─────────────────────────────────────────────────────

/** Auto-scroll direction used internally by DraxScrollView and DraxList */
export let AutoScrollDirection = /*#__PURE__*/function (AutoScrollDirection) {
  AutoScrollDirection[AutoScrollDirection["Back"] = -1] = "Back";
  AutoScrollDirection[AutoScrollDirection["None"] = 0] = "None";
  AutoScrollDirection[AutoScrollDirection["Forward"] = 1] = "Forward";
  return AutoScrollDirection;
}({});

/** Auto-scroll state used internally by DraxScrollView */

/** Props for auto-scroll options */

// ─── ScrollView Props ──────────────────────────────────────────────────────

/** Props for a DraxScrollView */

// ─── Sortable Types (List-Agnostic) ─────────────────────────────────────────

/** Reorder strategy for sortable lists */

/** Named animation preset for sortable item shift animations */

/** Custom animation configuration for sortable item shifts */

/** Animation configuration: a preset name or custom config object */

/** Measurement for a single sortable item, keyed by item key */

/** Internal payload attached to each SortableItem's DraxView */

/** Type guard for SortableItemPayload */
export function isSortableItemPayload(value) {
  return typeof value === 'object' && value !== null && 'index' in value && 'originalIndex' in value && typeof value.index === 'number' && typeof value.originalIndex === 'number';
}

/** Event data for sortable drag start */

/** Event data for sortable drag position change */

/** Event data for sortable drag end */

/** Event data for sortable item reorder */

/** Props for rendering a drop indicator in a sortable container */

/** Options for useSortableList hook */

/** Handle returned by useSortableList — pass to SortableContainer and SortableItem */

/** Internal state of the sortable list (not part of public API contract) */

// ─── Board Types (Cross-Container Sortable) ──────────────────────────────

/** Phantom slot for cross-container drag: virtual space in target column */

/** Event data for cross-container item transfer */

/** Options for useSortableBoard hook */

/** Handle returned by useSortableBoard — pass to SortableBoardContainer */

/** Transfer state during cross-container drag */

/** Internal state of the sortable board (not part of public API contract) */

/** Context value for board coordination.
 *  Uses Pick to avoid generic variance issues — consumers only need
 *  transferState and finalizeTransfer, not typed item fields. */

// ─── Utility Types ─────────────────────────────────────────────────────────
//# sourceMappingURL=types.js.map