"use strict";

import { useCallback, useRef } from 'react';
/**
 * Board-level coordinator for cross-container sortable drag.
 *
 * Maintains a registry of columns (each with their own useSortableList)
 * and tracks cross-container transfer state. The actual monitor callbacks
 * are handled by SortableBoardContainer.
 */
export const useSortableBoard = options => {
  const {
    keyExtractor,
    onTransfer
  } = options;
  const columnsRef = useRef(new Map());
  const transferStateRef = useRef(undefined);
  const registerColumn = useCallback((id, internal) => {
    columnsRef.current.set(id, internal);
  }, []);
  const unregisterColumn = useCallback(id => {
    columnsRef.current.delete(id);
  }, []);
  const internal = {
    keyExtractor,
    onTransfer,
    columns: columnsRef.current,
    registerColumn,
    unregisterColumn,
    transferState: transferStateRef
    // finalizeTransfer is set by SortableBoardContainer (needs DraxContext access)
  };
  return {
    _internal: internal
  };
};
//# sourceMappingURL=useSortableBoard.js.map