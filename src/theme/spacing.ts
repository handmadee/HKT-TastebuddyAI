/**
 * Spacing System
 * 
 * Based on 8px grid system for consistent spacing throughout the app.
 * All spacing values are multiples of 8.
 */

export const spacing = {
    // Base unit (8px)
    unit: 8,

    // Spacing scale
    xs: 4,    // 0.5 * unit
    sm: 8,    // 1 * unit
    md: 12,   // 1.5 * unit
    lg: 16,   // 2 * unit
    xl: 20,   // 2.5 * unit
    xxl: 24,  // 3 * unit
    xxxl: 32, // 4 * unit
    huge: 40, // 5 * unit
    massive: 48, // 6 * unit

    // Specific use cases
    container: {
        horizontal: 16,
        vertical: 20,
    },

    card: {
        padding: 16,
        gap: 12,
    },

    section: {
        marginBottom: 24,
        gap: 16,
    },

    input: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },

    button: {
        paddingHorizontal: 24,
        paddingVertical: 12,
    },

    modal: {
        padding: 20,
    },

    bottomSheet: {
        padding: 20,
        handleHeight: 4,
        handleWidth: 40,
    },
} as const;

export type Spacing = typeof spacing;

/**
 * Helper function to get spacing value
 * @param multiplier - Multiplier for base unit (default: 1)
 * @returns Spacing value in pixels
 */
export const getSpacing = (multiplier: number = 1): number => {
    return spacing.unit * multiplier;
};
