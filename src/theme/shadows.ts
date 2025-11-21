/**
 * Shadow System
 * 
 * Defines elevation shadows for iOS and Android.
 * Based on COLORS.MD shadow specifications.
 */

import { Platform } from 'react-native';

/**
 * Shadow configuration for different elevation levels
 */
const shadowConfig = {
    light: {
        ios: {
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.04,
            shadowRadius: 8,
        },
        android: {
            elevation: 2,
        },
    },
    normal: {
        ios: {
            shadowColor: '#017bff',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
        },
        android: {
            elevation: 4,
        },
    },
    strong: {
        ios: {
            shadowColor: '#017bff',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.18,
            shadowRadius: 24,
        },
        android: {
            elevation: 8,
        },
    },
    button: {
        ios: {
            shadowColor: '#017bff',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
        },
        android: {
            elevation: 3,
        },
    },
} as const;

/**
 * Get platform-specific shadow style
 */
export const shadows = {
    light: Platform.select({
        ios: shadowConfig.light.ios,
        android: shadowConfig.light.android,
        default: {},
    }),
    normal: Platform.select({
        ios: shadowConfig.normal.ios,
        android: shadowConfig.normal.android,
        default: {},
    }),
    strong: Platform.select({
        ios: shadowConfig.strong.ios,
        android: shadowConfig.strong.android,
        default: {},
    }),
    button: Platform.select({
        ios: shadowConfig.button.ios,
        android: shadowConfig.button.android,
        default: {},
    }),
    none: {},
} as const;

export type Shadows = typeof shadows;

/**
 * Helper function to get custom shadow
 * @param offset - Shadow offset
 * @param opacity - Shadow opacity
 * @param radius - Shadow blur radius
 * @param color - Shadow color (default: black)
 * @param elevation - Android elevation (default: 4)
 */
export const getCustomShadow = (
    offset: { width: number; height: number },
    opacity: number,
    radius: number,
    color: string = '#000000',
    elevation: number = 4
) => {
    return Platform.select({
        ios: {
            shadowColor: color,
            shadowOffset: offset,
            shadowOpacity: opacity,
            shadowRadius: radius,
        },
        android: {
            elevation,
        },
        default: {},
    });
};
