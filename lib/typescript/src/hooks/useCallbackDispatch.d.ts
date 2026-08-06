import type { ReactNode, RefObject } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import type { FlattenedHoverStyles } from '../HoverLayer';
import type { DragPhase, DraxProviderDragEvent, Position, SpatialEntry, ViewRegistryEntry } from '../types';
interface CallbackDispatchDeps {
    getViewEntry: (id: string) => ViewRegistryEntry | undefined;
    spatialIndexSV: SharedValue<SpatialEntry[]>;
    scrollOffsetsSV: SharedValue<Position[]>;
    draggedIdSV: SharedValue<string>;
    receiverIdSV: SharedValue<string>;
    rejectedReceiverIdSV: SharedValue<string>;
    dragPhaseSV: SharedValue<DragPhase>;
    hoverPositionSV: SharedValue<Position>;
    grabOffsetSV: SharedValue<Position>;
    startPositionSV: SharedValue<Position>;
    setHoverContent: (content: ReactNode | null) => void;
    hoverReadySV: SharedValue<boolean>;
    hoverClearDeferredRef: {
        current: boolean;
    };
    hoverStylesRef: RefObject<FlattenedHoverStyles | null>;
    onProviderDragStart?: (event: DraxProviderDragEvent) => void;
    onProviderDrag?: (event: DraxProviderDragEvent) => void;
    onProviderDragEnd?: (event: DraxProviderDragEvent & {
        cancelled: boolean;
    }) => void;
    droppedItemsRef: RefObject<Map<string, Set<string>>>;
}
/**
 * Provides JS-thread callback dispatch functions that are invoked via runOnJS
 * from gesture worklets. These handle ~5 calls per drag (start, receiver changes, end),
 * NOT per frame.
 */
export declare const useCallbackDispatch: (deps: CallbackDispatchDeps) => {
    handleDragStart: (draggedId: string, absolutePosition: Position, _grabOffset: Position) => void;
    handleReceiverChange: (oldReceiverId: string, newReceiverId: string, absolutePosition: Position, monitorIds?: string[]) => void;
    handleDragEnd: (draggedId: string, receiverId: string, cancelled: boolean, finalMonitorIds?: string[]) => void;
};
export {};
//# sourceMappingURL=useCallbackDispatch.d.ts.map