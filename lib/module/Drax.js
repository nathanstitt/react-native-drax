"use strict";

import { DraxHandle } from "./DraxHandle.js";
import { DraxList } from "./DraxList.js";
import { DraxProvider } from "./DraxProvider.js";
import { DraxScrollView } from "./DraxScrollView.js";
import { DraxView } from "./DraxView.js";
import { SortableBoardContainer } from "./SortableBoardContainer.js";
import { SortableContainer } from "./SortableContainer.js";
import { SortableItem } from "./SortableItem.js";

/**
 * Namespace object for convenient access to all Drax components.
 *
 * @example
 * ```tsx
 * import { Drax } from 'react-native-drax';
 *
 * <Drax.Provider>
 *   <Drax.View draggable>
 *     <Drax.Handle><GripIcon /></Drax.Handle>
 *   </Drax.View>
 * </Drax.Provider>
 * ```
 */
export const Drax = {
  Handle: DraxHandle,
  List: DraxList,
  Provider: DraxProvider,
  ScrollView: DraxScrollView,
  View: DraxView,
  SortableBoardContainer,
  SortableContainer,
  SortableItem
};
//# sourceMappingURL=Drax.js.map