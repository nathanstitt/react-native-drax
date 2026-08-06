import type { ReactNode } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import type { Position, SpatialEntry } from './types';
interface DebugOverlayProps {
    spatialIndexSV: SharedValue<SpatialEntry[]>;
    scrollOffsetsSV: SharedValue<Position[]>;
}
/**
 * Debug overlay that visualizes all registered Drax views.
 * Reads the spatial index SharedValue and renders colored borders
 * showing view bounds, roles (draggable/receptive/monitoring), and IDs.
 *
 * Rendered as an absolute-fill sibling in DraxProvider when debug={true}.
 */
export declare const DebugOverlay: ({ spatialIndexSV, scrollOffsetsSV, }: DebugOverlayProps) => ReactNode;
export {};
//# sourceMappingURL=DebugOverlay.d.ts.map