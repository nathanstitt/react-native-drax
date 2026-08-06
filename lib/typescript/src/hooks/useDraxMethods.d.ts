/**
 * Imperative methods for controlling and querying the Drax provider.
 *
 * Must be called within a `<DraxProvider>`.
 */
export declare const useDraxMethods: () => {
    requestPositionUpdate: () => void;
    getDroppedItems: (receiverId?: string) => Map<string, Set<string>> | Set<string>;
    clearDroppedItems: (receiverId?: string) => void;
    isDragging: () => boolean;
    getDraggedId: () => string | undefined;
};
//# sourceMappingURL=useDraxMethods.d.ts.map