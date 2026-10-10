"use strict";

import { Platform } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';
import { isFinalizeCanceled, useDraxPanGesture } from "../compat/index.js";
import { computeAbsolutePositionWorklet, hitTestWorklet } from "../math.js";
import { useDraxContext } from "./useDraxContext.js";
import { useWebPointerMoves } from "./useWebPointerMoves.js";

/**
 * The web `touch-action` a drag gesture needs.
 *
 * On web RNGH defaults touch-action to 'none', which blocks native scroll.
 * Allowing the scroll direction lets a user scroll before the long press
 * activates; SortableContainer freezes the scroll container once a drag starts.
 *
 * Priority: lockDragYPosition (explicit axis lock → pan-x) > scrollHorizontal
 * (hint from SortableItem for horizontal lists without axis lock) > pan-y.
 *
 * Exported so the dragHandle path can hand the same value to the
 * GestureDetector that attaches the gesture, rather than recomputing it.
 */
export const dragTouchAction = (lockDragYPosition, scrollHorizontal) => {
  if (Platform.OS !== 'web') return undefined;
  return lockDragYPosition || scrollHorizontal ? 'pan-x' : 'pan-y';
};

/**
 * Creates a Pan gesture for a draggable DraxView.
 * Hit-testing runs entirely on the UI thread — zero runOnJS per frame
 * unless the receiver changes.
 *
 * On RNGH v3, `enabledSV` and `longPressDelaySV` are SharedValues that
 * reconfigure the native gesture handler on the UI thread — zero JS bridge.
 * On RNGH v2, they are mirrored to plain values with gesture recreation on change.
 */
export const useDragGesture = (id, viewSpatialIndexSV, enabledSV, longPressDelaySV, lockDragXPosition, lockDragYPosition, dragBoundsSV, dragActivationFailOffset, scrollHorizontal,
// When the caller attaches the gesture itself (the dragHandle path), it also
// owns touchAction and passes it to its own GestureDetector. Baking it into
// the initial config here would push it at a handler the detector has not
// attached yet — see the comment on touchAction below.
deferTouchAction = false) => {
  const {
    draggedIdSV,
    receiverIdSV,
    rejectedReceiverIdSV,
    dragPhaseSV,
    hoverPositionSV,
    dragAbsolutePositionSV,
    spatialIndexSV,
    scrollOffsetsSV,
    grabOffsetSV,
    startPositionSV,
    rootOffsetSV,
    handleDragStart,
    handleReceiverChange,
    handleDragEnd
  } = useDraxContext();

  // RNGH applies a web touchAction by writing it onto the attached view, which
  // means it must not reach the handler before something has attached one. On
  // the dragHandle path the gesture is created HERE but attached by a
  // descendant DraxHandle, so an initial-config touchAction lands on an
  // uninitialized delegate and throws (reading 'userSelect' of undefined).
  // There, `deferTouchAction` keeps it out of the config and DraxHandle passes
  // the same value to its own GestureDetector instead — RNGH's web detector
  // takes touchAction as a prop and applies it only to handlers it has already
  // attached, so the ordering is guaranteed rather than raced.
  const isWeb = Platform.OS === 'web';
  const webTouchAction = dragTouchAction(lockDragYPosition, scrollHorizontal);
  const touchAction = deferTouchAction ? undefined : webTouchAction;

  // Touch position within the view at press-down. A pan activates only after
  // the pointer has travelled past its threshold, and gesture-handler resets
  // translation at activation, so the activation event alone cannot tell where
  // the press began. A fast mouse covers the threshold in one pointermove of
  // tens of pixels; grabbing at the activation point left the hover that far
  // off the pointer for the whole drag.
  const pressPointSV = useSharedValue({
    x: 0,
    y: 0
  });

  // The dragged view's size, kept from drag start. A virtualized list can
  // recycle the dragged row's cell for another item while the drag scrolls the
  // list: the view then re-registers under a new id, and its live entry no
  // longer describes what is being dragged. An in-flight drag therefore uses
  // the id in draggedIdSV and this size, never the view's current identity.
  const draggedDimsSV = useSharedValue(undefined);
  const failOffset = dragActivationFailOffset !== undefined ? [-dragActivationFailOffset, dragActivationFailOffset] : undefined;

  // The last pointer position a drag update ran for. On web the window
  // listener (see useWebPointerMoves) and gesture-handler both report most
  // moves; whichever comes second is skipped.
  const lastPointerSV = useSharedValue({
    x: NaN,
    y: NaN
  });
  const updateDrag = (absoluteX, absoluteY) => {
    'worklet';

    const draggedId = draggedIdSV.value;
    if (draggedId === '') return;
    if (isWeb) {
      const lastPointer = lastPointerSV.value;
      if (lastPointer.x === absoluteX && lastPointer.y === absoluteY) return;
      lastPointerSV.value = {
        x: absoluteX,
        y: absoluteY
      };
    }

    // Convert screen-absolute touch to root-view-relative
    const rootOffset = rootOffsetSV.value;
    const rootRelX = absoluteX - rootOffset.x;
    const rootRelY = absoluteY - rootOffset.y;
    const rootRelPos = {
      x: rootRelX,
      y: rootRelY
    };
    dragAbsolutePositionSV.value = rootRelPos;

    // Compute hover position (root-relative)
    const grabOffset = grabOffsetSV.value;
    const dims = draggedDimsSV.value;

    // Read current spatial index
    const spatialIndex = viewSpatialIndexSV.value;
    const entries = spatialIndexSV.value;
    const viewAbsPos = computeAbsolutePositionWorklet(spatialIndex, entries, scrollOffsetsSV.value);
    let hoverX = lockDragXPosition ? viewAbsPos.x : rootRelX - grabOffset.x;
    let hoverY = lockDragYPosition ? viewAbsPos.y : rootRelY - grabOffset.y;

    // Clamp to drag bounds if specified
    if (dragBoundsSV?.value) {
      const b = dragBoundsSV.value;
      const vw = dims ? dims.width : 0;
      const vh = dims ? dims.height : 0;
      hoverX = Math.max(b.x, Math.min(b.x + b.width - vw, hoverX));
      hoverY = Math.max(b.y, Math.min(b.y + b.height - vh, hoverY));
    }
    hoverPositionSV.value = {
      x: hoverX,
      y: hoverY
    };

    // Hit-test at the center of the hover view (not at the raw finger position)
    // so that receiving activates when the dragged item visually overlaps the receiver.
    const hitTestPos = {
      x: hoverX + (dims ? dims.width / 2 : 0),
      y: hoverY + (dims ? dims.height / 2 : 0)
    };
    dragAbsolutePositionSV.value = hitTestPos;
    const result = hitTestWorklet(hitTestPos, entries, scrollOffsetsSV.value, draggedId, dims);

    // Skip the rejected receiver — don't set it in receiverIdSV and don't
    // send it to JS. This prevents the reject → clear → re-detect → reject loop.
    let candidateReceiverId = result.receiverId;
    if (candidateReceiverId === rejectedReceiverIdSV.value) {
      candidateReceiverId = '';
    }

    // Clear rejection cache once drag leaves the rejected receiver's bounds
    if (result.receiverId !== rejectedReceiverIdSV.value && rejectedReceiverIdSV.value !== '') {
      rejectedReceiverIdSV.value = '';
    }

    // Always bounce to JS for callback dispatch.
    // handleReceiverChange safely handles same-receiver calls (skips exit/enter)
    // and dispatches continuous callbacks (onDrag, onDragOver, onReceiveDragOver)
    // plus monitor position updates for slot detection.
    const oldReceiver = receiverIdSV.value;
    const receiverChanged = candidateReceiverId !== oldReceiver;
    if (receiverChanged) {
      receiverIdSV.value = candidateReceiverId;
    }
    runOnJS(handleReceiverChange)(oldReceiver, candidateReceiverId, hitTestPos, result.monitorIds);
  };

  // Ends the drag: a last hit-test to capture the current monitors (they are
  // only tracked on receiver changes, so a drag without one would end with
  // none), then the end callbacks.
  const endDrag = cancelled => {
    'worklet';

    const currentDraggedId = draggedIdSV.value;
    if (currentDraggedId === '') return;
    const currentReceiverId = receiverIdSV.value;
    const finalHitResult = hitTestWorklet(dragAbsolutePositionSV.value, spatialIndexSV.value, scrollOffsetsSV.value, currentDraggedId, draggedDimsSV.value);

    // Set phase and clear receiver on UI thread so useAnimatedStyle
    // re-evaluates immediately (receiver style clears instantly).
    dragPhaseSV.value = 'releasing';
    receiverIdSV.value = '';

    // Bounce to JS for end callbacks + snap animation
    runOnJS(handleDragEnd)(currentDraggedId, currentReceiverId, cancelled, finalHitResult.monitorIds);
  };
  const {
    start: startWebPointerMoves,
    stop: stopWebPointerMoves
  } = useWebPointerMoves({
    onMove: updateDrag,
    onOrphanRelease: endDrag
  });
  const gesture = useDraxPanGesture({
    enabledSV,
    longPressDelaySV,
    maxPointers: 1,
    shouldCancelWhenOutside: false,
    touchAction,
    failOffsetX: failOffset,
    failOffsetY: failOffset,
    onBegin: event => {
      'worklet';

      pressPointSV.value = {
        x: event.x,
        y: event.y
      };
    },
    onActivate: event => {
      'worklet';

      // Convert screen-absolute touch to root-view-relative
      const rootOffset = rootOffsetSV.value;
      const rootRelX = event.absoluteX - rootOffset.x;
      const rootRelY = event.absoluteY - rootOffset.y;

      // Derive the view's visual position from the gesture event.
      // event.x/y = touch relative to the view's bounds (accounts for transforms).
      // This is more accurate than the spatial index for sortable items where
      // permanent shifts move views via CSS transform without updating layout.
      const viewAbsPos = {
        x: rootRelX - event.x,
        y: rootRelY - event.y
      };

      // Grab offset = touch position within the view at press-down, so the
      // hover keeps the spot the user grabbed under the pointer.
      const grabOffset = pressPointSV.value;

      // Store shared state (all positions in root-relative space).
      // DO NOT set dragPhaseSV here — it's set by HoverLayer's useLayoutEffect
      // AFTER hover content is committed to the DOM. This prevents the grab blink
      // (item going invisible before hover is visible).
      draggedIdSV.value = id;
      const activeEntry = spatialIndexSV.value[viewSpatialIndexSV.value];
      draggedDimsSV.value = activeEntry ? {
        width: activeEntry.width,
        height: activeEntry.height
      } : undefined;
      grabOffsetSV.value = grabOffset;
      startPositionSV.value = {
        x: rootRelX,
        y: rootRelY
      };
      dragAbsolutePositionSV.value = {
        x: rootRelX,
        y: rootRelY
      };

      // Compute initial hover position (root-relative)
      let hoverX = lockDragXPosition ? viewAbsPos.x : rootRelX - grabOffset.x;
      let hoverY = lockDragYPosition ? viewAbsPos.y : rootRelY - grabOffset.y;

      // Clamp to drag bounds if specified
      if (dragBoundsSV?.value) {
        const b = dragBoundsSV.value;
        const entries = spatialIndexSV.value;
        const viewEntry = entries[viewSpatialIndexSV.value];
        const vw = viewEntry ? viewEntry.width : 0;
        const vh = viewEntry ? viewEntry.height : 0;
        hoverX = Math.max(b.x, Math.min(b.x + b.width - vw, hoverX));
        hoverY = Math.max(b.y, Math.min(b.y + b.height - vh, hoverY));
      }
      hoverPositionSV.value = {
        x: hoverX,
        y: hoverY
      };

      // Reset receiver and rejection cache
      receiverIdSV.value = '';
      rejectedReceiverIdSV.value = '';
      if (isWeb) {
        lastPointerSV.value = {
          x: event.absoluteX,
          y: event.absoluteY
        };
        runOnJS(startWebPointerMoves)();
      }

      // Bounce to JS for callback dispatch + hover content setup
      runOnJS(handleDragStart)(id, {
        x: rootRelX,
        y: rootRelY
      }, grabOffset);
    },
    onUpdate: event => {
      'worklet';

      updateDrag(event.absoluteX, event.absoluteY);
    },
    onDeactivate: _event => {
      'worklet';

      if (isWeb) runOnJS(stopWebPointerMoves)();
      endDrag(false);
    },
    onFinalize: (event, didSucceed) => {
      'worklet';

      if (isWeb) runOnJS(stopWebPointerMoves)();

      // If gesture was cancelled (not ended normally).
      // endDrag checks draggedIdSV (set in onActivate) instead of dragPhaseSV
      // because phase is now set later in handleDragStart via runOnUI.
      if (isFinalizeCanceled(event, didSucceed)) endDrag(true);
    }
  });
  return gesture;
};
//# sourceMappingURL=useDragGesture.js.map