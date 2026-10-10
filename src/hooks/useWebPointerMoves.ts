import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';

/** Minimal structural types for the DOM pieces used here (no DOM lib needed). */
interface WebPointerEvent {
  clientX: number;
  clientY: number;
}
type WebPointerListener = (event: WebPointerEvent) => void;
type WebPointerEventType = 'pointermove' | 'pointerup' | 'pointercancel';
interface WebWindow {
  addEventListener(type: WebPointerEventType, listener: WebPointerListener, capture: boolean): void;
  removeEventListener(type: WebPointerEventType, listener: WebPointerListener, capture: boolean): void;
}

interface WebPointerHandlers {
  /** A pointer move, in client (viewport) coordinates. */
  onMove: (x: number, y: number) => void;
  /** The pointer was released after the dragged view unmounted. */
  onOrphanRelease: (cancelled: boolean) => void;
}

/**
 * Web only: follow the pointer on the window for the length of a drag.
 *
 * gesture-handler's web pan misses parts of a drag:
 *  - It drops the pointermove that crosses the dragged view's edge, sending it
 *    as a pointer leave (or enter) and never updating the pan. A small view such
 *    as a drag handle is left by the first move after the grab, and a fast mouse
 *    sends few moves, so the hover stopped one move behind the pointer.
 *  - Its handler lives on the dragged view. A virtualized list can unmount
 *    that view while the drag scrolls the list away from it; the pan then
 *    reports nothing more, not even the release, and the drag froze.
 *
 * Window listeners in the capture phase see every move. They stay attached
 * until the drag ends, even past an unmount of the view that started it, and a
 * release that gesture-handler can no longer report ends the drag here.
 *
 * On native, start/stop do nothing.
 */
export function useWebPointerMoves(handlers: WebPointerHandlers) {
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;
  const listenersRef = useRef<{
    move: WebPointerListener;
    up: WebPointerListener;
    cancel: WebPointerListener;
  } | null>(null);
  const unmountedRef = useRef(false);

  const stop = () => {
    const listeners = listenersRef.current;
    if (!listeners) return;
    const webWindow = globalThis as unknown as WebWindow;
    webWindow.removeEventListener('pointermove', listeners.move, true);
    webWindow.removeEventListener('pointerup', listeners.up, true);
    webWindow.removeEventListener('pointercancel', listeners.cancel, true);
    listenersRef.current = null;
  };

  const start = () => {
    if (Platform.OS !== 'web') return;
    stop();
    // While the view is mounted its pan reports the release; after an unmount
    // nothing else will.
    const release = (cancelled: boolean) => {
      if (!unmountedRef.current) return;
      stop();
      handlersRef.current.onOrphanRelease(cancelled);
    };
    const listeners = {
      move: (event: WebPointerEvent) => handlersRef.current.onMove(event.clientX, event.clientY),
      up: () => release(false),
      cancel: () => release(true),
    };
    listenersRef.current = listeners;
    const webWindow = globalThis as unknown as WebWindow;
    webWindow.addEventListener('pointermove', listeners.move, true);
    webWindow.addEventListener('pointerup', listeners.up, true);
    webWindow.addEventListener('pointercancel', listeners.cancel, true);
  };

  // An unmount leaves an in-flight drag's listeners in place; see above.
  useEffect(() => {
    unmountedRef.current = false;
    return () => {
      unmountedRef.current = true;
    };
  }, []);

  return { start, stop };
}
