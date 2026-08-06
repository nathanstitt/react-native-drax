"use strict";

import { useCallback, useEffect, useRef } from 'react';
import { runOnUI, useSharedValue } from 'react-native-reanimated';
import { defaultAutoScrollIntervalLength } from "../params.js";
import { useDraxId } from "./useDraxId.js";

// FlatList is invariant in its type parameter — `any` is the only valid union constraint

export const useDraxScrollHandler = ({
  idProp,
  onContentSizeChangeProp,
  onScrollProp,
  externalRef,
  doScroll
}) => {
  const scrollRef = useRef(null);
  const id = useDraxId(idProp);
  const containerMeasurementsRef = useRef(undefined);
  const scrollIntervalRef = useRef(undefined);
  const contentSizeRef = useRef(undefined);
  const scrollPosition = useSharedValue({
    x: 0,
    y: 0
  });
  const onMeasureContainer = measurements => {
    containerMeasurementsRef.current = measurements;
  };
  const onContentSizeChange = (width, height) => {
    contentSizeRef.current = {
      x: width,
      y: height
    };
    return onContentSizeChangeProp?.(width, height);
  };
  const onScroll = event => {
    onScrollProp?.(event);
    runOnUI((_scrollPos, _event) => {
      'worklet';

      _scrollPos.value = {
        x: _event.contentOffset.x,
        y: _event.contentOffset.y
      };
    })(scrollPosition, event.nativeEvent);
  };
  const setScrollRefs = instance => {
    if (instance) {
      scrollRef.current = instance;
      if (externalRef) {
        if (typeof externalRef === 'function') {
          externalRef(instance);
        } else {
          externalRef.current = instance;
        }
      }
    }
  };
  const startScroll = useCallback(() => {
    if (scrollIntervalRef.current) {
      return;
    }
    doScroll.current();
    scrollIntervalRef.current = setInterval(() => doScroll.current(), defaultAutoScrollIntervalLength);
  }, [doScroll]);
  const stopScroll = useCallback(() => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = undefined;
    }
  }, []);
  useEffect(() => {
    if (scrollIntervalRef.current) {
      stopScroll();
      startScroll();
    }
  }, [stopScroll, startScroll]);

  // Clean up interval on unmount
  useEffect(() => {
    return () => stopScroll();
  }, [stopScroll]);
  return {
    id,
    containerMeasurementsRef,
    contentSizeRef,
    onContentSizeChange,
    onMeasureContainer,
    onScroll,
    scrollRef,
    scrollPosition,
    setScrollRefs,
    startScroll,
    stopScroll
  };
};
//# sourceMappingURL=useDraxScrollHandler.js.map