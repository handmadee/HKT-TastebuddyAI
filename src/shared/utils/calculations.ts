/**
 * Calculation Utilities
 * 
 * Health and nutrition calculations (BMI, TDEE, macros, etc.)
 */

/**
 * Calculate BMI (Body Mass Index)
 * BMI = weight (kg) / (height (m))^2
 */
export const calculateBMI = (weightKg: number, heightCm: number): number => {
    const heightM = heightCm / 100;
    return weightKg / (heightM * heightM);
};

/**
 * Get BMI category
 */
export const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
};

/**
 * Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
 * Men: BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age + 5
 * Women: BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age - 161
 */
export const calculateBMR = (
    weightKg: number,
    heightCm: number,
    age: number,
    gender: 'male' | 'female' | 'other'
): number => {
    const baseBMR = 10 * weightKg + 6.25 * heightCm - 5 * age;

    if (gender === 'male') {
        return baseBMR + 5;
    } else if (gender === 'female') {
        return baseBMR - 161;
    } else {
        // Average for 'other'
        return baseBMR - 78;
    }
};

/**
 * Calculate TDEE (Total Daily Energy Expenditure)
 * TDEE = BMR * Activity Factor
 */
export const calculateTDEE = (
    bmr: number,
    activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active'
): number => {
    const activityFactors = {
        sedentary: 1.2,
        lightly_active: 1.375,
        moderately_active: 1.55,
        very_active: 1.725,
        extremely_active: 1.9,
    };

    return bmr * activityFactors[activityLevel];
};

/**
 * Calculate target calories based on goal
 */
export const calculateTargetCalories = (
    tdee: number,
    goal: 'lose_weight' | 'maintain_weight' | 'gain_weight' | 'build_muscle'
): number => {
    const adjustments = {
        lose_weight: -500, // 500 cal deficit
        maintain_weight: 0,
        gain_weight: 300,
        build_muscle: 300,
    };

    return tdee + adjustments[goal];
};

/**
 * Calculate macro breakdown (protein, carbs, fat)
 * Returns grams for each macro
 */
export const calculateMacros = (
    calories: number,
    goal: 'lose_weight' | 'maintain_weight' | 'gain_weight' | 'build_muscle'
): { protein: number; carbs: number; fat: number } => {
    // Macro ratios (as percentage of total calories)
    const ratios = {
        lose_weight: { protein: 0.30, carbs: 0.40, fat: 0.30 },
        maintain_weight: { protein: 0.25, carbs: 0.45, fat: 0.30 },
        gain_weight: { protein: 0.25, carbs: 0.50, fat: 0.25 },
        build_muscle: { protein: 0.30, carbs: 0.45, fat: 0.25 },
    };

    const ratio = ratios[goal];

    // Convert calories to grams
    // Protein: 4 cal/g, Carbs: 4 cal/g, Fat: 9 cal/g
    return {
        protein: Math.round((calories * ratio.protein) / 4),
        carbs: Math.round((calories * ratio.carbs) / 4),
        fat: Math.round((calories * ratio.fat) / 9),
    };
};

/**
 * Calculate percentage of daily target
 */
export const calculateProgress = (current: number, target: number): number => {
    if (target === 0) return 0;
    return Math.min((current / target) * 100, 100);
};

/**
 * Calculate calories from macros
 */
export const calculateCaloriesFromMacros = (
    protein: number,
    carbs: number,
    fat: number
): number => {
    return protein * 4 + carbs * 4 + fat * 9;
};
