/**
 * Validation Utilities
 * 
 * Common validation functions for forms and inputs
 */

export const validation = {
    /**
     * Validate email format
     */
    isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Validate password strength
     * - At least 8 characters
     * - At least one uppercase letter
     * - At least one lowercase letter
     * - At least one number
     */
    isValidPassword(password: string): boolean {
        if (password.length < 8) return false;

        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);

        return hasUppercase && hasLowercase && hasNumber;
    },

    /**
     * Validate phone number (basic)
     */
    isValidPhone(phone: string): boolean {
        const phoneRegex = /^\+?[\d\s\-()]+$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
    },

    /**
     * Validate URL format
     */
    isValidUrl(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },

    /**
     * Validate number in range
     */
    isInRange(value: number, min: number, max: number): boolean {
        return value >= min && value <= max;
    },

    /**
     * Validate required field
     */
    isRequired(value: any): boolean {
        if (typeof value === 'string') {
            return value.trim().length > 0;
        }
        return value != null;
    },

    /**
     * Validate min length
     */
    hasMinLength(value: string, minLength: number): boolean {
        return value.length >= minLength;
    },

    /**
     * Validate max length
     */
    hasMaxLength(value: string, maxLength: number): boolean {
        return value.length <= maxLength;
    },
};
