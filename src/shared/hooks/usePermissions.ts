/**
 * Permission Handler Hook
 * 
 * Centralized permission handling for Camera, Microphone, Photos, and Location
 */

import { useState, useCallback } from 'react';
import { useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { Alert, Linking } from 'react-native';
import { PERMISSION_MESSAGES, type PermissionType } from '../constants/permissions';

type PermissionStatus = 'granted' | 'denied' | 'undetermined';

interface PermissionState {
    camera: PermissionStatus;
    microphone: PermissionStatus;
    photoLibrary: PermissionStatus;
    location: PermissionStatus;
}

export const usePermissions = () => {
    const [cameraPermission, requestCameraPermissionHook] = useCameraPermissions();
    const [microphonePermission, requestMicrophonePermissionHook] = useMicrophonePermissions();

    const [permissionState, setPermissionState] = useState<PermissionState>({
        camera: 'undetermined',
        microphone: 'undetermined',
        photoLibrary: 'undetermined',
        location: 'undetermined',
    });

    /**
     * Request camera permission
     */
    const requestCameraPermission = useCallback(async (): Promise<boolean> => {
        try {
            const response = await requestCameraPermissionHook();
            const granted = response.granted;

            setPermissionState(prev => ({ ...prev, camera: granted ? 'granted' : 'denied' }));

            if (!granted) {
                showPermissionDeniedAlert('CAMERA');
            }

            return granted;
        } catch (error) {
            console.error('Error requesting camera permission:', error);
            return false;
        }
    }, [requestCameraPermissionHook]);

    /**
     * Request microphone permission
     */
    const requestMicrophonePermission = useCallback(async (): Promise<boolean> => {
        try {
            const response = await requestMicrophonePermissionHook();
            const granted = response.granted;

            setPermissionState(prev => ({ ...prev, microphone: granted ? 'granted' : 'denied' }));

            if (!granted) {
                showPermissionDeniedAlert('MICROPHONE');
            }

            return granted;
        } catch (error) {
            console.error('Error requesting microphone permission:', error);
            return false;
        }
    }, [requestMicrophonePermissionHook]);

    /**
     * Request photo library permission
     */
    const requestPhotoLibraryPermission = useCallback(async (): Promise<boolean> => {
        try {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            const granted = status === 'granted';

            setPermissionState(prev => ({ ...prev, photoLibrary: status }));

            if (!granted) {
                showPermissionDeniedAlert('PHOTO_LIBRARY');
            }

            return granted;
        } catch (error) {
            console.error('Error requesting photo library permission:', error);
            return false;
        }
    }, []);

    /**
     * Request location permission
     */
    const requestLocationPermission = useCallback(async (): Promise<boolean> => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            const granted = status === 'granted';

            setPermissionState(prev => ({ ...prev, location: status }));

            if (!granted) {
                showPermissionDeniedAlert('LOCATION');
            }

            return granted;
        } catch (error) {
            console.error('Error requesting location permission:', error);
            return false;
        }
    }, []);

    /**
     * Check camera permission status
     */
    const checkCameraPermission = useCallback(async (): Promise<boolean> => {
        const granted = cameraPermission?.granted || false;
        setPermissionState(prev => ({ ...prev, camera: granted ? 'granted' : 'denied' }));
        return granted;
    }, [cameraPermission]);

    /**
     * Check photo library permission status
     */
    const checkPhotoLibraryPermission = useCallback(async (): Promise<boolean> => {
        const permission = await MediaLibrary.getPermissionsAsync();
        const granted = permission.status === 'granted';
        setPermissionState(prev => ({ ...prev, photoLibrary: permission.status }));
        return granted;
    }, []);

    /**
     * Check location permission status
     */
    const checkLocationPermission = useCallback(async (): Promise<boolean> => {
        const permission = await Location.getForegroundPermissionsAsync();
        const granted = permission.status === 'granted';
        setPermissionState(prev => ({ ...prev, location: permission.status }));
        return granted;
    }, []);

    /**
     * Show alert when permission is denied
     */
    const showPermissionDeniedAlert = (type: PermissionType) => {
        const { title, message } = PERMISSION_MESSAGES[type];

        Alert.alert(
            title,
            `${message}\n\nPlease enable it in Settings to continue.`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Open Settings',
                    onPress: () => Linking.openSettings(),
                },
            ]
        );
    };

    return {
        permissionState,
        requestCameraPermission,
        requestMicrophonePermission,
        requestPhotoLibraryPermission,
        requestLocationPermission,
        checkCameraPermission,
        checkPhotoLibraryPermission,
        checkLocationPermission,
    };
};
