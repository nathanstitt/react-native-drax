/** Default snapback delay in milliseconds */
export declare const defaultSnapbackDelay = 100;
/** Default snapback duration in milliseconds */
export declare const defaultSnapbackDuration = 250;
/** Default pre-drag long press delay in milliseconds */
export declare const defaultLongPressDelay = 0;
/** Default pre-drag long press delay in milliseconds for DraxList items */
export declare const defaultListItemLongPressDelay = 250;
/** Default scroll event throttle (number of events per second) for DraxScrollView */
export declare const defaultScrollEventThrottle = 8;
/** Default interval length in milliseconds for auto-scrolling jumps */
export declare const defaultAutoScrollIntervalLength = 250;
/** Default auto-scroll jump distance, as a fraction relative to content width/length */
export declare const defaultAutoScrollJumpRatio = 0.2;
/** Default drag-over maximum position threshold for auto-scroll back, as a fraction relative to content width/length */
export declare const defaultAutoScrollBackThreshold = 0.1;
/** Default drag-over minimum position threshold for auto-scroll forward, as a fraction relative to content width/length */
export declare const defaultAutoScrollForwardThreshold = 0.9;
/** Duration in milliseconds for list item shift/reorder animations */
export declare const ITEM_SHIFT_ANIMATION_DURATION = 200;
/** Resolved animation configuration for sortable item shifts */
export interface ResolvedAnimationConfig {
    useSpring: boolean;
    shiftDuration: number;
    springDamping: number;
    springStiffness: number;
    springMass: number;
}
/** Resolve a SortableAnimationConfig (preset or custom) to concrete values */
export declare function resolveAnimationConfig(config: import('./types').SortableAnimationConfig | undefined): ResolvedAnimationConfig;
//# sourceMappingURL=params.d.ts.map