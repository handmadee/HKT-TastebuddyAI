/**
 * ScanScreen - Production-ready camera screen
 *
 * Features:
 * - Apple-style UX with clean, modular components
 * - Full-screen camera with SafeArea handling
 * - Proper state management (initial, detecting, success, error)  
 * - Reusable UI components following SOLID principles
 * - Accessibility support
 * - Haptic feedback
 */

import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Alert, Linking, Platform } from 'react-native';
import { CameraView, CameraType, FlashMode } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraTopBar } from '../components/CameraTopBar';
import { CameraOverlayGuide } from '../components/CameraOverlayGuide';
import { CameraStatusText, CameraStatus } from '../components/CameraStatusText';
import { PrimaryCaptureButton } from '../components/PrimaryCaptureButton';
import { PermissionDeniedScreen } from '../components/PermissionDeniedScreen';
import { usePermissions } from '../../../shared/hooks/usePermissions';
import { useScanStore } from '../stores/scanStore';
import { colors } from '../../../theme';
import { logger } from '../../../shared/services/logger/logger';

export const ScanScreen: React.FC = () => {
    const router = useRouter();
    const cameraRef = useRef<CameraView>(null);

    // Camera settings
    const [cameraType, setCameraType] = useState<CameraType>('back');
    const [flashMode, setFlashMode] = useState<FlashMode>('off');
    const [hasPermission, setHasPermission] = useState(false);

    // State management
    const [cameraStatus, setCameraStatus] = useState<CameraStatus>('initial');
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

    const handleOpenSettings = async () => {
        if (Platform.OS === 'ios') {
            await Linking.openURL('app-settings:');
        } else {
            await Linking.openSettings();
        }
    };

    const handleClose = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.back();
    };

    const handleFlashToggle = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setFlashMode((current) => (current === 'off' ? 'on' : 'off'));
    };

    const handleCameraFlip = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setCameraType((current) => (current === 'back' ? 'front' : 'back'));
    };

    const handleCapture = async () => {
        if (!cameraRef.current || isCapturing) return;

        try {
            setIsCapturing(true);
            setCameraStatus('detecting');

            // Haptic feedback for capture
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

            logger.info('Capturing image');

            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.8,
                base64: false,
            });

            if (photo?.uri) {
                logger.info('Image captured', { uri: photo.uri });

                // Show success state briefly
                setCameraStatus('success');
                await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

                // Small delay for UX
                await new Promise(resolve => setTimeout(resolve, 500));

                // Navigate to analyzing screen
                router.push('/scan/analyzing');

                // Start analysis
                await analyzeFoodImage(photo.uri);
            }
        } catch (error) {
            logger.error('Failed to capture image', { error });
            setCameraStatus('error');
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

            Alert.alert(
                'Capture Failed',
                'Unable to capture image. Please try again.',
                [
                    {
                        text: 'Retry',
                        onPress: () => setCameraStatus('initial'),
                        style: 'default',
                    },
                ]
            );
        } finally {
            setIsCapturing(false);
        }
    };

    const handlePickImage = async () => {
        try {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

            // Request photo library permission
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert(
                    'Permission Required',
                    'Please grant photo library access to select images.',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Settings', onPress: handleOpenSettings },
                    ]
                );
                return;
            }

            // Launch image picker
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]?.uri) {
                logger.info('Image selected from gallery', { uri: result.assets[0].uri });

                setCameraStatus('detecting');
                await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

                // Navigate to analyzing screen
                router.push('/scan/analyzing');

                // Start analysis
                await analyzeFoodImage(result.assets[0].uri);
            }
        } catch (error) {
            logger.error('Failed to pick image', { error });
            Alert.alert('Error', 'Failed to select image. Please try again.');
        }
    };

    // Permission denied state
    if (!hasPermission) {
        return (
            <PermissionDeniedScreen
                onRequestPermission={requestPermission}
                onOpenSettings={handleOpenSettings}
            />
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={styles.camera}
                facing={cameraType}
                flash={flashMode}
            >
                <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
                    <View style={styles.overlay}>
                        {/* Top Bar */}
                        <CameraTopBar
                            onClose={handleClose}
                            onFlashToggle={handleFlashToggle}
                            onCameraFlip={handleCameraFlip}
                            isFlashOn={flashMode === 'on'}
                            statusText={cameraStatus === 'detecting' ? 'Analyzing...' : undefined}
                        />

                        {/* Guide Frame */}
                        <CameraOverlayGuide />

                        {/* Status Text */}
                        <CameraStatusText status={cameraStatus} />

                        {/* Primary Capture Button */}
                        <PrimaryCaptureButton
                            onPress={handleCapture}
                            onGalleryPress={handlePickImage}
                            loading={isCapturing}
                            disabled={isCapturing || cameraStatus === 'detecting'}
                        />
                    </View>
                </SafeAreaView>
            </CameraView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
    },
    camera: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
    },
});
