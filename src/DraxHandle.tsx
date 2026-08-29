import type { ReactNode } from 'react';
import { use } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Reanimated from 'react-native-reanimated';

import { DraxHandleContext } from './DraxHandleContext';

export interface DraxHandleProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Drag handle component — only touches on this area will start a drag.
 *
 * Must be a descendant of a `DraxView` that has `dragHandle={true}`.
 * The parent DraxView provides its gesture via context; this component
 * attaches it to the handle's touch area via GestureDetector.
 *
 * @example
 * ```tsx
 * <DraxView dragHandle style={styles.row}>
 *   <DraxHandle style={styles.grip}>
 *     <GripIcon />
 *   </DraxHandle>
 *   <Text>Item content</Text>
 * </DraxView>
 * ```
 */
export function DraxHandle({ children, style }: DraxHandleProps) {
  const ctx = use(DraxHandleContext);

  if (!ctx) {
    // No context = either misconfigured, or rendering inside hover overlay
    // (which clones children outside the DraxHandleContext tree).
    // Render as a plain view — the gesture isn't needed in hover.
    return (
      <Reanimated.View style={style}>
        {children}
      </Reanimated.View>
    );
  }

  // touchAction rides the detector, not the gesture config: this component owns
  // the attach, and RNGH's web detector applies DOM props only to handlers it
  // has already attached. Supplying it at gesture-creation time instead would
  // reach the handler before any view was attached to it.
  return (
    <GestureDetector gesture={ctx.gesture} touchAction={ctx.touchAction}>
      <Reanimated.View style={style}>
        {children}
      </Reanimated.View>
    </GestureDetector>
  );
}
