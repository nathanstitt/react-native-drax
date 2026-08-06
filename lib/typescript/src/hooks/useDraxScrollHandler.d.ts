import type { Ref, RefObject } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { FlatList, ScrollView } from 'react-native';
import type { DraxViewMeasurements, Position } from '../types';
type ScrollableComponents = FlatList<any> | ScrollView;
type DraxScrollHandlerArgs<T extends ScrollableComponents> = {
    idProp?: string;
    onContentSizeChangeProp?: (w: number, h: number) => void;
    onScrollProp?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    externalRef?: Ref<T>;
    doScroll: RefObject<() => void>;
};
export declare const useDraxScrollHandler: <T extends ScrollableComponents>({ idProp, onContentSizeChangeProp, onScrollProp, externalRef, doScroll, }: DraxScrollHandlerArgs<T>) => {
    id: string;
    containerMeasurementsRef: RefObject<DraxViewMeasurements | undefined>;
    contentSizeRef: RefObject<Position | undefined>;
    onContentSizeChange: (width: number, height: number) => void | undefined;
    onMeasureContainer: (measurements: DraxViewMeasurements | undefined) => void;
    onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    scrollRef: RefObject<T | null>;
    scrollPosition: import("react-native-reanimated").SharedValue<Position>;
    setScrollRefs: (instance: T | null) => void;
    startScroll: () => void;
    stopScroll: () => void;
};
export {};
//# sourceMappingURL=useDraxScrollHandler.d.ts.map