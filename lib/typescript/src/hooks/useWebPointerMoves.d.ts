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
export declare function useWebPointerMoves(handlers: WebPointerHandlers): {
    start: () => void;
    stop: () => void;
};
export {};
//# sourceMappingURL=useWebPointerMoves.d.ts.map