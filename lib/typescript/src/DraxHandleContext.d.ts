import type { DraxPanGesture } from './compat';
export interface DraxHandleContextValue {
    gesture: DraxPanGesture;
    /**
     * The web `touch-action` the gesture needs, handed to DraxHandle instead of
     * being baked into the gesture config.
     *
     * RNGH applies touchAction by writing it onto the ATTACHED view, so it must
     * not reach the handler before a GestureDetector has attached one. Here the
     * gesture is created by DraxView but attached by DraxHandle, so a value
     * supplied at creation arrives first and throws. DraxHandle passes this to
     * its own GestureDetector, which applies DOM props only to handlers it has
     * already attached. Undefined on native.
     */
    touchAction?: 'pan-x' | 'pan-y';
}
/**
 * Context that passes the drag gesture from a DraxView (with `dragHandle` prop)
 * to its descendant DraxHandle component. When a DraxView has `dragHandle={true}`,
 * it does NOT wrap itself in a GestureDetector. Instead, the gesture is provided
 * via this context so that DraxHandle can attach it to a smaller touch area.
 */
export declare const DraxHandleContext: import("react").Context<DraxHandleContextValue | null>;
//# sourceMappingURL=DraxHandleContext.d.ts.map