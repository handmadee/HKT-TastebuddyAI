/**
 * Permission Constants
 * 
 * Defines required permissions for the app
 */

export const PERMISSIONS = {
    CAMERA: 'camera',
    MICROPHONE: 'microphone',
    PHOTO_LIBRARY: 'photo_library',
    LOCATION: 'location',
} as const;

export const PERMISSION_MESSAGES = {
    CAMERA: {
        title: 'Camera Permission Required',
        message: 'TastebuddyAI needs access to your camera to scan food and menus.',
    },
    MICROPHONE: {
        title: 'Microphone Permission Required',
        message: 'TastebuddyAI needs access to your microphone for voice features.',
    },
    PHOTO_LIBRARY: {
        title: 'Photo Library Permission Required',
        message: 'TastebuddyAI needs access to your photo library to analyze food images.',
    },
    LOCATION: {
        title: 'Location Permission Required',
        message: 'TastebuddyAI needs access to your location to find nearby restaurants.',
    },
} as const;

export type PermissionType = keyof typeof PERMISSIONS;
