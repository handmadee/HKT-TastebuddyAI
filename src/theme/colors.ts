/**
 * Color System - Based on COLORS.MD
 * 
 * This file provides the complete color palette for TastebuddyAI.
 * All colors are defined as constants to ensure consistency across the app.
 */

export const colors = {
    // Primary Colors
    primary: '#017bff',
    secondary: '#38c85d',
    accent: '#fe9402',
    error: '#ff4d4f',
    info: '#0096ff',
    disabled: '#888888',

    // Background Colors
    backgroundMain: '#e6f9eb',
    backgroundAlt: '#fff5e4',
    backgroundWhite: '#fffefe',
    backgroundGray: '#f7f7fa',

    // Card & Popup
    card: '#ffffff',
    popup: '#f8f8f8',

    // Borders & Dividers
    border: '#e0e0e0',
    divider: '#eeeeee',

    // Text Colors
    textPrimary: '#222222',
    textSecondary: '#555555',
    textActive: '#017bff',
    textSuccess: '#38c85d',
    textWarning: '#fe9402',
    textError: '#ff4d4f',
    textDisabled: '#888888',
    textPlaceholder: '#ababab',

    // Button Colors
    button: {
        backgroundDefault: '#017bff',
        backgroundSecondary: '#e6f9eb',
        backgroundAccent: '#fe9402',
        backgroundDisabled: '#e6f9eb',
        textDefault: '#fffefe',
        textSecondary: '#017bff',
        textAccent: '#fffefe',
        textDisabled: '#888888',
    },

    // Input Colors
    inputBackground: '#fffefe',
    input: {
        background: '#fffefe',
        border: '#e0e0e0',
        text: '#222222',
        placeholder: '#ababab',
        focus: '#017bff',
        error: '#ff4d4f',
    },

    // Common Colors
    white: '#ffffff',
    black: '#000000',

    // Status Colors
    status: {
        active: '#38c85d',
        inactive: '#888888',
        pending: '#fe9402',
        completed: '#017bff',
    },

    // Safety Indicator Colors
    safety: {
        safe: '#38c85d',
        warning: '#fe9402',
        danger: '#ff4d4f',
    },

    // Toast/Message Colors
    toast: {
        success: {
            background: '#e6f9eb',
            text: '#38c85d',
            border: '#38c85d',
        },
        error: {
            background: '#fff1f0',
            text: '#ff4d4f',
            border: '#ff4d4f',
        },
        warning: {
            background: '#fff5e4',
            text: '#fe9402',
            border: '#fe9402',
        },
        info: {
            background: '#e6f4ff',
            text: '#0096ff',
            border: '#0096ff',
        },
    },
} as const;

export type Colors = typeof colors;
