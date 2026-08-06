import type { SharedValue } from 'react-native-reanimated';
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
} | null>, dragActivationFailOffset?: number, scrollHorizontal?: boolean) => import("react-native-gesture-handler").PanGesture;
//# sourceMappingURL=useDragGesture.d.ts.map