/**
 * Theme System
 * 
 * Central export for all theme-related constants and utilities.
 * This is the main entry point for using the design system.
 */

import { colors } from './colors';
import { typography } from './typography';
import { spacing, getSpacing } from './spacing';
import { shadows, getCustomShadow } from './shadows';
import { borderRadius } from './borderRadius';

export const theme = {
    colors,
    typography,
    spacing,
    shadows,
    borderRadius,
} as const;

// Export individual modules
export { colors } from './colors';
export { typography } from './typography';
export { spacing, getSpacing } from './spacing';
export { shadows, getCustomShadow } from './shadows';
export { borderRadius } from './borderRadius';

// Export types
export type { Colors } from './colors';
export type { Typography } from './typography';
export type { Spacing } from './spacing';
export type { Shadows } from './shadows';
export type { BorderRadius } from './borderRadius';

export type Theme = typeof theme;

export default theme;
