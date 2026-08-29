import type { SharedValue } from 'react-native-reanimated';
/**
 * The web `touch-action` a drag gesture needs.
 *
 * On web RNGH defaults touch-action to 'none', which blocks native scroll.
 * Allowing the scroll direction lets a user scroll before the long press
 * activates; SortableContainer freezes the scroll container once a drag starts.
 *
 * Priority: lockDragYPosition (explicit axis lock → pan-x) > scrollHorizontal
 * (hint from SortableItem for horizontal lists without axis lock) > pan-y.
 *
 * Exported so the dragHandle path can hand the same value to the
 * GestureDetector that attaches the gesture, rather than recomputing it.
 */
export declare const dragTouchAction: (lockDragYPosition?: boolean, scrollHorizontal?: boolean) => "pan-x" | "pan-y" | undefined;
/**
 * Creates a Pan gesture for a draggable DraxView.
 * Hit-testing runs entirely on the UI thread — zero runOnJS per frame
 * unless the receiver changes.
 *
 * On RNGH v3, `enabledSV` and `longPressDelaySV` are SharedValues that
 * reconfigure the native gesture handler on the UI thread — zero JS bridge.
 * On RNGH v2, they are mirrored to plain values with gesture recreation on change.
 */
export declare const useDragGesture: (id: string, viewSpatialIndexSV: SharedValue<number>, enabledSV: SharedValue<boolean>, longPressDelaySV: SharedValue<number>, lockDragXPosition?: boolean, lockDragYPosition?: boolean, dragBoundsSV?: SharedValue<{
    x: number;
    y: number;
    width: number;
    height: number;
} | null>, dragActivationFailOffset?: number, scrollHorizontal?: boolean, deferTouchAction?: boolean) => import("react-native-gesture-handler").PanGesture;
//# sourceMappingURL=useDragGesture.d.ts.map