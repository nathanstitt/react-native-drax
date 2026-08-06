import type { SharedValue } from 'react-native-reanimated';
import type { DraxViewMeasurements, DraxViewProps, Position, RegisterViewPayload, SpatialEntry, ViewRegistryEntry } from '../types';
/**
 * Manages the spatial index (SharedValue<SpatialEntry[]>) and the JS-thread
 * view registry (Map<string, ViewRegistryEntry>).
 *
 * The spatial index lives on the UI thread and is used by gesture worklets
 * for hit-testing. The registry is JS-thread only and stores callbacks,
 * props, and other data that worklets don't need.
 */
export declare const useSpatialIndex: () => {
    spatialIndexSV: SharedValue<SpatialEntry[]>;
    scrollOffsetsSV: SharedValue<Position[]>;
    registerView: (payload: RegisterViewPayload) => void;
    unregisterView: (id: string) => void;
    updateMeasurements: (id: string, measurements: DraxViewMeasurements) => void;
    updateScrollOffset: (id: string, offset: Position) => void;
    updateViewProps: (id: string, props: DraxViewProps) => void;
    getViewEntry: (id: string) => ViewRegistryEntry | undefined;
};
export declare function isDraggable(props: DraxViewProps): boolean;
//# sourceMappingURL=useSpatialIndex.d.ts.map