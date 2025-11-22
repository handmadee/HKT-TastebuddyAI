/**
 * Border Radius System
 * 
 * Defines consistent border radius values based on COLORS.MD.
 */

export const borderRadius = {
    none: 0,
    xs: 4,
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 20,
    full: 9999,

    // Component-specific
    button: 8,
    input: 8,
    card: 12,
    modal: 16,
    badge: 4,
    avatar: 9999,
    small: 4,
} as const;

export type BorderRadius = typeof borderRadius;
