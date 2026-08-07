import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
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
export declare function DraxHandle({ children, style }: DraxHandleProps): import("react").JSX.Element;
//# sourceMappingURL=DraxHandle.d.ts.map