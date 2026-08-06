import type { DraxPanGesture, DraxPanGestureConfig } from './types';
/**
 * Version-agnostic pan gesture hook.
 * Delegates to v3's usePanGesture (optimal) or v2's Gesture.Pan() builder (compat).
 * Selected at module load time to avoid conditional hook calls.
 */
export declare const useDraxPanGesture: (config: DraxPanGestureConfig) => DraxPanGesture;
//# sourceMappingURL=useDraxPanGesture.d.ts.map