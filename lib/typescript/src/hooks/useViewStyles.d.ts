import type { DraxViewStyleProps, DraxStyleProp } from '../types';
/**
 * Provides animated styles for a DraxView.
 *
 * Key performance property: reads ONLY draggedIdSV, receiverIdSV, and dragPhaseSV.
 * These change ~5 times per drag total (not per frame), so ALL views re-evaluate
 * their styles only ~5 times per drag operation.
 *
 * hoverPositionSV is NOT read here — only HoverLayer reads it, ensuring only
 * 1 component re-evaluates per frame during active drag.
 */
export declare const useViewStyles: (id: string, styleProps: DraxViewStyleProps) => {
    style: DraxStyleProp | undefined;
    animatedDragStyle: import("react-native-reanimated/lib/typescript/hook/commonTypes").AnimatedStyleHandle<Readonly<Omit<Readonly<Omit<Readonly<{
        display?: "none" | "flex" | "contents";
        width?: import("react-native").DimensionValue;
        height?: import("react-native").DimensionValue;
        bottom?: import("react-native").DimensionValue;
        end?: import("react-native").DimensionValue;
        left?: import("react-native").DimensionValue;
        right?: import("react-native").DimensionValue;
        start?: import("react-native").DimensionValue;
        top?: import("react-native").DimensionValue;
        inset?: import("react-native").DimensionValue;
        insetBlock?: import("react-native").DimensionValue;
        insetBlockEnd?: import("react-native").DimensionValue;
        insetBlockStart?: import("react-native").DimensionValue;
        insetInline?: import("react-native").DimensionValue;
        insetInlineEnd?: import("react-native").DimensionValue;
        insetInlineStart?: import("react-native").DimensionValue;
        minWidth?: import("react-native").DimensionValue;
        maxWidth?: import("react-native").DimensionValue;
        minHeight?: import("react-native").DimensionValue;
        maxHeight?: import("react-native").DimensionValue;
        margin?: import("react-native").DimensionValue;
        marginBlock?: import("react-native").DimensionValue;
        marginBlockEnd?: import("react-native").DimensionValue;
        marginBlockStart?: import("react-native").DimensionValue;
        marginBottom?: import("react-native").DimensionValue;
        marginEnd?: import("react-native").DimensionValue;
        marginHorizontal?: import("react-native").DimensionValue;
        marginInline?: import("react-native").DimensionValue;
        marginInlineEnd?: import("react-native").DimensionValue;
        marginInlineStart?: import("react-native").DimensionValue;
        marginLeft?: import("react-native").DimensionValue;
        marginRight?: import("react-native").DimensionValue;
        marginStart?: import("react-native").DimensionValue;
        marginTop?: import("react-native").DimensionValue;
        marginVertical?: import("react-native").DimensionValue;
        padding?: import("react-native").DimensionValue;
        paddingBlock?: import("react-native").DimensionValue;
        paddingBlockEnd?: import("react-native").DimensionValue;
        paddingBlockStart?: import("react-native").DimensionValue;
        paddingBottom?: import("react-native").DimensionValue;
        paddingEnd?: import("react-native").DimensionValue;
        paddingHorizontal?: import("react-native").DimensionValue;
        paddingInline?: import("react-native").DimensionValue;
        paddingInlineEnd?: import("react-native").DimensionValue;
        paddingInlineStart?: import("react-native").DimensionValue;
        paddingLeft?: import("react-native").DimensionValue;
        paddingRight?: import("react-native").DimensionValue;
        paddingStart?: import("react-native").DimensionValue;
        paddingTop?: import("react-native").DimensionValue;
        paddingVertical?: import("react-native").DimensionValue;
        borderWidth?: number;
        borderBottomWidth?: number;
        borderEndWidth?: number;
        borderLeftWidth?: number;
        borderRightWidth?: number;
        borderStartWidth?: number;
        borderTopWidth?: number;
        position?: "absolute" | "relative" | "static";
        flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
        flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
        justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
        alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
        alignSelf?: "auto" | "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
        alignContent?: "flex-start" | "flex-end" | "center" | "stretch" | "space-between" | "space-around" | "space-evenly";
        overflow?: "visible" | "hidden" | "scroll";
        flex?: number;
        flexGrow?: number;
        flexShrink?: number;
        flexBasis?: number | string;
        aspectRatio?: number | string;
        boxSizing?: "border-box" | "content-box";
        zIndex?: number;
        direction?: "inherit" | "ltr" | "rtl";
        rowGap?: number | string;
        columnGap?: number | string;
        gap?: number | string;
    }>, "shadowColor" | "shadowOffset" | "shadowOpacity" | "shadowRadius" | "transform" | "transformOrigin" | "backfaceVisibility" | "backgroundColor" | "borderColor" | "borderCurve" | "borderBottomColor" | "borderEndColor" | "borderLeftColor" | "borderRightColor" | "borderStartColor" | "borderTopColor" | "borderBlockColor" | "borderBlockEndColor" | "borderBlockStartColor" | "borderRadius" | "borderBottomEndRadius" | "borderBottomLeftRadius" | "borderBottomRightRadius" | "borderBottomStartRadius" | "borderEndEndRadius" | "borderEndStartRadius" | "borderStartEndRadius" | "borderStartStartRadius" | "borderTopEndRadius" | "borderTopLeftRadius" | "borderTopRightRadius" | "borderTopStartRadius" | "borderStyle" | "borderWidth" | "borderBottomWidth" | "borderEndWidth" | "borderLeftWidth" | "borderRightWidth" | "borderStartWidth" | "borderTopWidth" | "opacity" | "outlineColor" | "outlineOffset" | "outlineStyle" | "outlineWidth" | "elevation" | "pointerEvents" | "cursor" | "boxShadow" | "filter" | "mixBlendMode" | "experimental_backgroundImage" | "experimental_backgroundSize" | "experimental_backgroundPosition" | "experimental_backgroundRepeat" | "isolation"> & Omit<Readonly<Omit<Readonly<{
        shadowColor?: import("react-native/types_generated/Libraries/StyleSheet/StyleSheetTypes").____ColorValue_Internal;
        shadowOffset?: Readonly<{
            width?: number;
            height?: number;
        }>;
        shadowOpacity?: number;
        shadowRadius?: number;
    }>, never> & Omit<Readonly<{}>, never>>, "transform" | "transformOrigin" | "backfaceVisibility" | "backgroundColor" | "borderColor" | "borderCurve" | "borderBottomColor" | "borderEndColor" | "borderLeftColor" | "borderRightColor" | "borderStartColor" | "borderTopColor" | "borderBlockColor" | "borderBlockEndColor" | "borderBlockStartColor" | "borderRadius" | "borderBottomEndRadius" | "borderBottomLeftRadius" | "borderBottomRightRadius" | "borderBottomStartRadius" | "borderEndEndRadius" | "borderEndStartRadius" | "borderStartEndRadius" | "borderStartStartRadius" | "borderTopEndRadius" | "borderTopLeftRadius" | "borderTopRightRadius" | "borderTopStartRadius" | "borderStyle" | "borderWidth" | "borderBottomWidth" | "borderEndWidth" | "borderLeftWidth" | "borderRightWidth" | "borderStartWidth" | "borderTopWidth" | "opacity" | "outlineColor" | "outlineOffset" | "outlineStyle" | "outlineWidth" | "elevation" | "pointerEvents" | "cursor" | "boxShadow" | "filter" | "mixBlendMode" | "experimental_backgroundImage" | "experimental_backgroundSize" | "experimental_backgroundPosition" | "experimental_backgroundRepeat" | "isolation"> & Omit<Readonly<{
        transform?: ReadonlyArray<Readonly<import("react-native/types_generated/Libraries/StyleSheet/private/_TransformStyle").MaximumOneOf<import("react-native/types_generated/Libraries/StyleSheet/private/_TransformStyle").MergeUnion<{
            readonly perspective: number | import("react-native/types_generated/Libraries/Animated/AnimatedExports").Node;
        } | {
            readonly rotate: string | import("react-native/types_generated/Libraries/Animated/AnimatedExports").Node;
        } | {
            readonly rotateX: string | import("react-native/types_generated/Libraries/Animated/AnimatedExports").Node;
        } | {
            readonly rotateY: string | import("react-native/types_generated/Libraries/Animated/AnimatedExports").Node;
        } | {
            readonly rotateZ: string | import("react-native/types_generated/Libraries/Animated/AnimatedExports").Node;
        } | {
            readonly scale: number | import("react-native/types_generated/Libraries/Animated/AnimatedExports").Node;
        } | {
            readonly scaleX: number | import("react-native/types_generated/Libraries/Animated/AnimatedExports").Node;
        } | {
            readonly scaleY: number | import("react-native/types_generated/Libraries/Animated/AnimatedExports").Node;
        } | {
            readonly translateX: number | string | import("react-native/types_generated/Libraries/Animated/AnimatedExports").Node;
        } | {
            readonly translateY: number | string | import("react-native/types_generated/Libraries/Animated/AnimatedExports").Node;
        } | {
            readonly translate: [number | string | import("react-native/types_generated/Libraries/Animated/AnimatedExports").Node, number | string | import("react-native/types_generated/Libraries/Animated/AnimatedExports").Node] | import("react-native/types_generated/Libraries/Animated/AnimatedExports").Node;
        } | {
            readonly skewX: string | import("react-native/types_generated/Libraries/Animated/AnimatedExports").Node;
        } | {
            readonly skewY: string | import("react-native/types_generated/Libraries/Animated/AnimatedExports").Node;
        } | {
            readonly matrix: ReadonlyArray<number | import("react-native/types_generated/Libraries/Animated/AnimatedExports").Node> | import("react-native/types_generated/Libraries/Animated/AnimatedExports").Node;
        }>>>> | string;
        transformOrigin?: [string | number, string | number, string | number] | string;
    }>, "backfaceVisibility" | "backgroundColor" | "borderColor" | "borderCurve" | "borderBottomColor" | "borderEndColor" | "borderLeftColor" | "borderRightColor" | "borderStartColor" | "borderTopColor" | "borderBlockColor" | "borderBlockEndColor" | "borderBlockStartColor" | "borderRadius" | "borderBottomEndRadius" | "borderBottomLeftRadius" | "borderBottomRightRadius" | "borderBottomStartRadius" | "borderEndEndRadius" | "borderEndStartRadius" | "borderStartEndRadius" | "borderStartStartRadius" | "borderTopEndRadius" | "borderTopLeftRadius" | "borderTopRightRadius" | "borderTopStartRadius" | "borderStyle" | "borderWidth" | "borderBottomWidth" | "borderEndWidth" | "borderLeftWidth" | "borderRightWidth" | "borderStartWidth" | "borderTopWidth" | "opacity" | "outlineColor" | "outlineOffset" | "outlineStyle" | "outlineWidth" | "elevation" | "pointerEvents" | "cursor" | "boxShadow" | "filter" | "mixBlendMode" | "experimental_backgroundImage" | "experimental_backgroundSize" | "experimental_backgroundPosition" | "experimental_backgroundRepeat" | "isolation"> & Omit<Readonly<{
        backfaceVisibility?: "visible" | "hidden";
        backgroundColor?: import("react-native/types_generated/Libraries/StyleSheet/StyleSheetTypes").____ColorValue_Internal;
        borderColor?: import("react-native/types_generated/Libraries/StyleSheet/StyleSheetTypes").____ColorValue_Internal;
        borderCurve?: "circular" | "continuous";
        borderBottomColor?: import("react-native/types_generated/Libraries/StyleSheet/StyleSheetTypes").____ColorValue_Internal;
        borderEndColor?: import("react-native/types_generated/Libraries/StyleSheet/StyleSheetTypes").____ColorValue_Internal;
        borderLeftColor?: import("react-native/types_generated/Libraries/StyleSheet/StyleSheetTypes").____ColorValue_Internal;
        borderRightColor?: import("react-native/types_generated/Libraries/StyleSheet/StyleSheetTypes").____ColorValue_Internal;
        borderStartColor?: import("react-native/types_generated/Libraries/StyleSheet/StyleSheetTypes").____ColorValue_Internal;
        borderTopColor?: import("react-native/types_generated/Libraries/StyleSheet/StyleSheetTypes").____ColorValue_Internal;
        borderBlockColor?: import("react-native/types_generated/Libraries/StyleSheet/StyleSheetTypes").____ColorValue_Internal;
        borderBlockEndColor?: import("react-native/types_generated/Libraries/StyleSheet/StyleSheetTypes").____ColorValue_Internal;
        borderBlockStartColor?: import("react-native/types_generated/Libraries/StyleSheet/StyleSheetTypes").____ColorValue_Internal;
        borderRadius?: number | string;
        borderBottomEndRadius?: number | string;
        borderBottomLeftRadius?: number | string;
        borderBottomRightRadius?: number | string;
        borderBottomStartRadius?: number | string;
        borderEndEndRadius?: number | string;
        borderEndStartRadius?: number | string;
        borderStartEndRadius?: number | string;
        borderStartStartRadius?: number | string;
        borderTopEndRadius?: number | string;
        borderTopLeftRadius?: number | string;
        borderTopRightRadius?: number | string;
        borderTopStartRadius?: number | string;
        borderStyle?: "solid" | "dotted" | "dashed";
        borderWidth?: number;
        borderBottomWidth?: number;
        borderEndWidth?: number;
        borderLeftWidth?: number;
        borderRightWidth?: number;
        borderStartWidth?: number;
        borderTopWidth?: number;
        opacity?: number;
        outlineColor?: import("react-native/types_generated/Libraries/StyleSheet/StyleSheetTypes").____ColorValue_Internal;
        outlineOffset?: number;
        outlineStyle?: "solid" | "dotted" | "dashed";
        outlineWidth?: number;
        elevation?: number;
        pointerEvents?: "auto" | "none" | "box-none" | "box-only";
        cursor?: import("react-native").CursorValue;
        boxShadow?: ReadonlyArray<import("react-native").BoxShadowValue> | string;
        filter?: ReadonlyArray<import("react-native").FilterFunction> | string;
        mixBlendMode?: "color" | "overlay" | "normal" | "multiply" | "screen" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion" | "hue" | "saturation" | "luminosity";
        experimental_backgroundImage?: ReadonlyArray<import("react-native/types_generated/Libraries/StyleSheet/StyleSheetTypes").BackgroundImageValue> | string;
        experimental_backgroundSize?: ReadonlyArray<import("react-native/types_generated/Libraries/StyleSheet/StyleSheetTypes").BackgroundSizeValue> | string;
        experimental_backgroundPosition?: ReadonlyArray<import("react-native/types_generated/Libraries/StyleSheet/StyleSheetTypes").BackgroundPositionValue> | string;
        experimental_backgroundRepeat?: ReadonlyArray<import("react-native/types_generated/Libraries/StyleSheet/StyleSheetTypes").BackgroundRepeatValue> | string;
        isolation?: "auto" | "isolate";
    }>, never>>, never> & Omit<Readonly<{}>, never>>>;
};
//# sourceMappingURL=useViewStyles.d.ts.map