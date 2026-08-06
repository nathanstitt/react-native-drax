import type { RefObject } from 'react';
/**
 * On mobile web, RNGH sets touch-action:none on gesture views which blocks
 * native scroll. We set touch-action:pan-y (via gesture config) to allow
 * scroll before long-press. When drag activates, this hook freezes the
 * scroll container (overflow:hidden) so scroll stops. On drag end, unfreeze.
 *
 * On native, this is a no-op.
 */
export declare function useWebScrollFreeze(scrollRef: RefObject<object | null>): {
    freeze: () => void;
    unfreeze: () => void;
};
//# sourceMappingURL=useWebScrollFreeze.d.ts.map