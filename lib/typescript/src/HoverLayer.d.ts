import type { ReactNode, RefObject } from 'react';
import type { ViewStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import type { DragPhase, Position } from './types';
/** Flattened hover styles for the currently dragged view */
export interface FlattenedHoverStyles {
    hoverStyle: ViewStyle | null;
    hoverDraggingStyle: ViewStyle | null;
    hoverDraggingWithReceiverStyle: ViewStyle | null;
    hoverDraggingWithoutReceiverStyle: ViewStyle | null;
    hoverDragReleasedStyle: ViewStyle | null;
}
interface HoverLayerProps {
    hoverContentRef: RefObject<ReactNode>;
    /** Changing this value triggers a re-render to pick up new ref content */
    hoverVersion: number;
    hoverPositionSV: SharedValue<Position>;
    dragPhaseSV: SharedValue<DragPhase>;
    receiverIdSV: SharedValue<string>;
    /** Set to true after hover content is committed — SortableItem reads this for visibility */
    hoverReadySV: SharedValue<boolean>;
    /** Animated hover content dimensions. x=width, y=height. {0,0}=no constraint. */
    hoverDimsSV: SharedValue<Position>;
    /** Ref to flattened hover styles of the currently dragged view */
    hoverStylesRef: RefObject<FlattenedHoverStyles | null>;
}
/**
 * Single hover layer component that renders the hover content during drag.
 *
 * This is the ONLY component that reads hoverPositionSV (changes every frame).
 * All other DraxViews read draggedIdSV/receiverIdSV/dragPhaseSV which change ~5x per drag.
 *
 * Content is passed via ref to avoid re-rendering the entire DraxProvider tree.
 * Only this component re-renders when hover content changes (via hoverVersion).
 */
export declare const HoverLayer: import("react").MemoExoticComponent<({ hoverContentRef, hoverVersion, hoverPositionSV, dragPhaseSV, receiverIdSV, hoverReadySV, hoverDimsSV, hoverStylesRef }: HoverLayerProps) => import("react").JSX.Element>;
export {};
//# sourceMappingURL=HoverLayer.d.ts.map