"use strict";

import { useMemo } from 'react';
import { DraxContext } from "./DraxContext.js";
import { useDraxContext } from "./hooks/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
export const DraxSubprovider = ({
  parent,
  children
}) => {
  const contextValue = useDraxContext();
  const subContextValue = useMemo(() => ({
    ...contextValue,
    parent
  }), [contextValue, parent]);
  return /*#__PURE__*/_jsx(DraxContext, {
    value: subContextValue,
    children: children
  });
};
//# sourceMappingURL=DraxSubprovider.js.map