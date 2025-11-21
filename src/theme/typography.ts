/**
 * Typography System
 * 
 * Defines font families, sizes, weights, and text styles
 * based on COLORS.MD and extended for production use.
 */

export const typography = {
    // Font Families
    fontFamily: {
        primary: 'SF Pro Display',
        secondary: 'Inter',
        fallback: 'Arial, sans-serif',
    },

    // Font Sizes
    fontSize: {
        h1: 28,
        h2: 22,
        h3: 18,
        h4: 16,
        body: 16,
        small: 14,
        tiny: 12,
        caption: 10,
    },

    // Font Weights
    fontWeight: {
        normal: '400' as const,
        medium: '500' as const,
        semibold: '600' as const,
        bold: '700' as const,
    },

    // Line Heights
    lineHeight: {
        h1: 34,
        h2: 28,
        h3: 24,
        h4: 22,
        body: 22,
        small: 20,
        tiny: 18,
        caption: 14,
    },

    // Letter Spacing
    letterSpacing: {
        normal: 0,
        wide: 0.5,
        wider: 1,
    },

    // Predefined Text Styles
    styles: {
        h1: {
            fontSize: 28,
            fontWeight: '700' as const,
            lineHeight: 34,
            letterSpacing: 0,
        },
        h2: {
            fontSize: 22,
            fontWeight: '700' as const,
            lineHeight: 28,
            letterSpacing: 0,
        },
        h3: {
            fontSize: 18,
            fontWeight: '600' as const,
            lineHeight: 24,
            letterSpacing: 0,
        },
        h4: {
            fontSize: 16,
            fontWeight: '600' as const,
            lineHeight: 22,
            letterSpacing: 0,
        },
        bodyRegular: {
            fontSize: 16,
            fontWeight: '400' as const,
            lineHeight: 22,
            letterSpacing: 0,
        },
        bodyMedium: {
            fontSize: 16,
            fontWeight: '500' as const,
            lineHeight: 22,
            letterSpacing: 0,
        },
        bodySmall: {
            fontSize: 14,
            fontWeight: '400' as const,
            lineHeight: 20,
            letterSpacing: 0,
        },
        bodyTiny: {
            fontSize: 12,
            fontWeight: '400' as const,
            lineHeight: 18,
            letterSpacing: 0,
        },
        button: {
            fontSize: 16,
            fontWeight: '600' as const,
            lineHeight: 22,
            letterSpacing: 0.5,
            textTransform: 'uppercase' as const,
        },
        caption: {
            fontSize: 10,
            fontWeight: '400' as const,
            lineHeight: 14,
            letterSpacing: 0,
        },
    },
} as const;

export type Typography = typeof typography;
