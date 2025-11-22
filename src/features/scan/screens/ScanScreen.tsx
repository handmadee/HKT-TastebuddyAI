/**
 * ScanScreen
 *
 * Main camera screen for scanning food
 */

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CameraView, CameraType } from 'expo-camera';
import { useRouter } from 'expo-router';
import { Screen } from '../../../shared/components/layout/Screen';
import { CaptureButton } from '../components/CaptureButton';
import { usePermissions } from '../../../shared/hooks/usePermissions';
import { useScanStore } from '../stores/scanStore';
import { colors, spacing, typography, borderRadius } from '../../../theme';
import { logger } from '../../../shared/services/logger/logger';

export const ScanScreen: React.FC = () => {
    const router = useRouter();
    const cameraRef = useRef<CameraView>(null);
    const [cameraType, setCameraType] = useState<CameraType>('back');
    const [hasPermission, setHasPermission] = useState(false);
    const [isCapturing, setIsCapturing] = useState(false);

    const { requestCameraPermission } = usePermissions();
    const { startScan, analyzeFoodImage } = useScanStore();

    useEffect(() => {
        requestPermission();
    }, []);

    const requestPermission = async () => {
        const granted = await requestCameraPermission();
        setHasPermission(granted);

        if (granted) {
            startScan();
        }
    };

    const handleCapture = async () => {
        if (!cameraRef.current || isCapturing) return;

        try {
            setIsCapturing(true);
            logger.info('Capturing image');

            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.8,
                base64: false,
            });

            if (photo?.uri) {
                logger.info('Image captured', { uri: photo.uri });

                // Navigate to analyzing screen
                router.push('/scan/analyzing');

                // Start analysis
                await analyzeFoodImage(photo.uri);

                // Navigation to results will be handled in AnalyzingScreen
            }
        } catch (error) {
            logger.error('Failed to capture image', { error });
            Alert.alert('Error', 'Failed to capture image. Please try again.');
        } finally {
            setIsCapturing(false);
        }
    };

    const toggleCameraType = () => {
        setCameraType((current) => (current === 'back' ? 'front' : 'back'));
    };

    if (!hasPermission) {
        return (
            <Screen safeArea>
                <View style={styles.permissionContainer}>
                    <Text style={styles.permissionIcon}>📷</Text>
                    <Text style={styles.permissionTitle}>Camera Access Required</Text>
                    <Text style={styles.permissionMessage}>
                        TastebuddyAI needs access to your camera to scan food and analyze
                        nutrition information.
                    </Text>
                    <TouchableOpacity
                        style={styles.permissionButton}
                        onPress={requestPermission}
                    >
                        <Text style={styles.permissionButtonText}>Grant Permission</Text>
                    </TouchableOpacity>
                </View>
            </Screen>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={styles.camera}
                facing={cameraType}
            >
                <View style={styles.overlay}>
                    {/* Top bar */}
                    <View style={styles.topBar}>
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => router.back()}
                        >
                            <Text style={styles.iconButtonText}>✕</Text>
                        </TouchableOpacity>

                        <Text style={styles.topBarTitle}>Scan Food</Text>

                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={toggleCameraType}
                        >
                            <Text style={styles.iconButtonText}>🔄</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Guide frame */}
                    <View style={styles.guideFrame}>
                        <View style={styles.frameCorner} />
                    </View>

                    {/* Instructions */}
                    <View style={styles.instructionsContainer}>
                        <Text style={styles.instructionsText}>
                            Position food in the center
                        </Text>
                    </View>

                    {/* Bottom bar with capture button */}
                    <View style={styles.bottomBar}>
                        <View style={styles.bottomBarSpacer} />

                        <CaptureButton
                            onPress={handleCapture}
                            loading={isCapturing}
                            disabled={isCapturing}
                        />

                        <View style={styles.bottomBarSpacer}>
                            <TouchableOpacity style={styles.galleryButton}>
                                <Text style={styles.galleryButtonText}>📁</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </CameraView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundBlack,
    },
    camera: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xl,
    },
    permissionIcon: {
        fontSize: 80,
        marginBottom: spacing.lg,
    },
    permissionTitle: {
        ...typography.styles.h2,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.md,
        textAlign: 'center',
    },
    permissionMessage: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
        textAlign: 'center',
        marginBottom: spacing.xl,
    },
    permissionButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.button,
    },
    permissionButtonText: {
        ...typography.styles.bodyLarge,
        color: colors.backgroundWhite,
        fontWeight: typography.fontWeight.semibold,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.lg,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    topBarTitle: {
        ...typography.styles.h3,
        color: colors.backgroundWhite,
        fontWeight: typography.fontWeight.semibold,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButtonText: {
        fontSize: 24,
        color: colors.backgroundWhite,
    },
    guideFrame: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
    },
    frameCorner: {
        width: 280,
        height: 280,
        borderWidth: 3,
        borderColor: colors.backgroundWhite,
        borderRadius: borderRadius.card,
    },
    instructionsContainer: {
        alignItems: 'center',
        paddingVertical: spacing.lg,
    },
    instructionsText: {
        ...typography.styles.bodyLarge,
        color: colors.backgroundWhite,
        fontWeight: typography.fontWeight.medium,
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.badge,
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.xl,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    bottomBarSpacer: {
        flex: 1,
    },
    galleryButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    galleryButtonText: {
        fontSize: 28,
    },
});
