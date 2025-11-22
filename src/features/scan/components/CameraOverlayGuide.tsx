import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { colors, borderRadius } from '../../../theme';

const { width, height } = Dimensions.get('window');
const GUIDE_SIZE = Math.min(width, height) * 0.7;

/**
 * Camera Overlay Guide - Frame to show scan area
 * Uses subtle corners to guide users without obstructing the view
 */
export const CameraOverlayGuide: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.frame}>
                {/* Top Left Corner */}
                <View style={[styles.corner, styles.topLeft]} />

                {/* Top Right Corner */}
                <View style={[styles.corner, styles.topRight]} />

                {/* Bottom Left Corner */}
                <View style={[styles.corner, styles.bottomLeft]} />

                {/* Bottom Right Corner */}
                <View style={[styles.corner, styles.bottomRight]} />
            </View>
        </View>
    );
};

const CORNER_SIZE = 24;
const CORNER_THICKNESS = 3;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    frame: {
        width: GUIDE_SIZE,
        height: GUIDE_SIZE,
        position: 'relative',
    },
    corner: {
        position: 'absolute',
        width: CORNER_SIZE,
        height: CORNER_SIZE,
        borderColor: colors.backgroundWhite,
    },
    topLeft: {
        top: 0,
        left: 0,
        borderTopWidth: CORNER_THICKNESS,
        borderLeftWidth: CORNER_THICKNESS,
        borderTopLeftRadius: borderRadius.card,
    },
    topRight: {
        top: 0,
        right: 0,
        borderTopWidth: CORNER_THICKNESS,
        borderRightWidth: CORNER_THICKNESS,
        borderTopRightRadius: borderRadius.card,
    },
    bottomLeft: {
        bottom: 0,
        left: 0,
        borderBottomWidth: CORNER_THICKNESS,
        borderLeftWidth: CORNER_THICKNESS,
        borderBottomLeftRadius: borderRadius.card,
    },
    bottomRight: {
        bottom: 0,
        right: 0,
        borderBottomWidth: CORNER_THICKNESS,
        borderRightWidth: CORNER_THICKNESS,
        borderBottomRightRadius: borderRadius.card,
    },
});
