# Onboarding Feature

A comprehensive onboarding flow for TastebuddyAI that guides new users through setting up their profile, preferences, and health goals.

## Overview

The onboarding flow consists of 8 steps that collect user information and permissions to provide a personalized nutrition experience:

1. **Language Selection** - Choose preferred app language
2. **Dietary Preferences** - Select dietary restrictions and preferences (Halal, Vegan, Kosher, etc.)
3. **Allergen Setup** - Configure food allergies with severity levels
4. **Nutrition Goals** - Enter personal metrics (age, weight, height, activity level, health goals)
5. **Daily Targets** - View calculated daily calorie and macro targets
6. **Smart Features** - Enable camera and notification permissions
7. **Location Permission** - Enable location access for restaurant recommendations
8. **Completion** - Review features and start using the app

## Architecture

### SOLID Principles Applied

#### Single Responsibility Principle (SRP)
- Each screen component handles only its specific step in the onboarding flow
- Reusable UI components (SelectableCard, AllergenCard, PermissionCard) have single, well-defined purposes
- Business logic is separated into the Zustand store

#### Open/Closed Principle (OCP)
- Components are open for extension but closed for modification
- `OnboardingContainer` is a generic wrapper that can accommodate any step content
- `SegmentedControl` is generic and can work with any string-based enum

#### Liskov Substitution Principle (LSP)
- All screen components follow the same pattern and can be swapped without breaking the flow
- Reusable components extend base React component patterns consistently

#### Interface Segregation Principle (ISP)
- Types are split into focused interfaces (Language, DietaryPreference, Allergen, etc.)
- Components receive only the props they need

#### Dependency Inversion Principle (DIP)
- Screens depend on the abstract Zustand store interface, not concrete implementations
- Navigation is handled through Expo Router's abstraction layer

## File Structure

```
src/features/onboarding/
├── components/              # Reusable UI components
│   ├── AllergenCard.tsx    # Allergen selection with severity
│   ├── MacroBar.tsx        # Macro nutrient progress bar
│   ├── OnboardingContainer.tsx  # Generic screen wrapper
│   ├── OnboardingProgress.tsx   # Progress indicator
│   ├── PermissionCard.tsx  # Permission toggle card
│   ├── SegmentedControl.tsx     # Multi-option selector
│   └── SelectableCard.tsx  # Selectable option card
├── constants/              # Static data
│   ├── allergens.ts       # Allergen types list
│   ├── dietaryPreferences.ts    # Dietary preferences list
│   └── languages.ts       # Available languages
├── screens/               # Onboarding step screens
│   ├── AllergensScreen.tsx
│   ├── CompletionScreen.tsx
│   ├── DailyTargetsScreen.tsx
│   ├── DietaryPreferencesScreen.tsx
│   ├── LanguageSelectionScreen.tsx
│   ├── LocationPermissionScreen.tsx
│   ├── NutritionGoalsScreen.tsx
│   └── SmartFeaturesScreen.tsx
├── stores/                # State management
│   └── onboardingStore.ts # Zustand store with business logic
├── types/                 # TypeScript definitions
│   └── index.ts
├── index.ts              # Feature exports
└── README.md             # This file
```

## Usage

### Starting the Onboarding Flow

The onboarding flow is automatically triggered when:
1. A user is authenticated
2. The user has not completed onboarding (`completed` flag is false)

```typescript
import { useOnboardingStore } from '@features/onboarding';

const { completed, completeOnboarding } = useOnboardingStore();

// Check if onboarding is complete
if (!completed) {
  // Navigate to onboarding
  router.push('/(onboarding)');
}
```

### Accessing Onboarding Data

```typescript
import { useOnboardingStore } from '@features/onboarding';

const {
  language,
  dietaryPreferences,
  allergens,
  nutritionGoals,
  dailyTargets,
  smartFeatures,
} = useOnboardingStore();
```

### Resetting Onboarding

```typescript
const { resetOnboarding } = useOnboardingStore();

// Reset all onboarding data
resetOnboarding();
```

## Components

### OnboardingContainer

Generic wrapper for onboarding screens with progress indicator and navigation buttons.

```typescript
<OnboardingContainer
  title="Screen Title"
  subtitle="Screen subtitle"
  currentStep={0}
  totalSteps={8}
  onNext={() => {}}
  onBack={() => {}}
  nextLabel="Continue"
  backLabel="Back"
  nextDisabled={false}
  showProgress={true}
>
  {/* Screen content */}
</OnboardingContainer>
```

### SelectableCard

Reusable card component for single or multiple selection scenarios.

```typescript
<SelectableCard
  title="Option Title"
  subtitle="Option description"
  icon={<Icon />}
  selected={isSelected}
  onPress={() => toggleSelection()}
/>
```

### AllergenCard

Specialized card for allergen selection with severity levels.

```typescript
<AllergenCard
  type="peanuts"
  name="Peanuts"
  selected={isSelected}
  severity="moderate"
  onToggle={() => toggleAllergen()}
  onSeverityChange={(severity) => updateSeverity(severity)}
/>
```

## State Management

The onboarding store uses Zustand and includes:

### State
- `language`: Selected language code
- `dietaryPreferences`: Array of dietary preferences
- `allergens`: Array of allergens with severity levels
- `nutritionGoals`: User's health profile and goals
- `dailyTargets`: Calculated calorie and macro targets
- `smartFeatures`: Permission states
- `currentStep`: Current onboarding step (0-7)
- `completed`: Whether onboarding is complete

### Actions
- `setLanguage(language)`: Set app language
- `setDietaryPreferences(preferences)`: Set dietary preferences
- `addAllergen(allergen)`: Add an allergen
- `removeAllergen(type)`: Remove an allergen
- `updateAllergenSeverity(type, severity)`: Update allergen severity
- `setNutritionGoals(goals)`: Set health profile
- `calculateDailyTargets()`: Calculate calorie and macro targets
- `setSmartFeature(feature, enabled)`: Toggle smart feature
- `nextStep()`: Move to next step
- `previousStep()`: Move to previous step
- `goToStep(step)`: Jump to specific step
- `completeOnboarding()`: Mark onboarding as complete
- `resetOnboarding()`: Reset all data

## Calculations

### Daily Calorie Target

The app uses the **Mifflin-St Jeor Equation** to calculate BMR (Basal Metabolic Rate):

**For Men:**
```
BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(years) + 5
```

**For Women:**
```
BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(years) - 161
```

**TDEE (Total Daily Energy Expenditure):**
```
TDEE = BMR × Activity Multiplier
```

Activity multipliers:
- Sedentary: 1.2
- Light: 1.375
- Moderate: 1.55
- Active: 1.725
- Very Active: 1.9

**Calorie Target Based on Goal:**
- Lose weight: TDEE × 0.8 (20% deficit)
- Maintain: TDEE
- Gain muscle: TDEE × 1.1 (10% surplus)

### Macronutrient Distribution

**Lose Weight:**
- Protein: 35% of calories
- Carbs: 40% of calories
- Fats: 25% of calories

**Gain Muscle:**
- Protein: 30% of calories
- Carbs: 45% of calories
- Fats: 25% of calories

**Maintain:**
- Protein: 30% of calories
- Carbs: 40% of calories
- Fats: 30% of calories

Conversion:
- 1g Protein = 4 calories
- 1g Carbs = 4 calories
- 1g Fat = 9 calories

## Navigation Flow

```
/(onboarding)
  ├── /language                 (Step 1)
  ├── /dietary-preferences      (Step 2)
  ├── /allergens               (Step 3)
  ├── /nutrition-goals         (Step 4)
  ├── /daily-targets           (Step 5)
  ├── /smart-features          (Step 6)
  ├── /location-permission     (Step 7)
  └── /completion              (Step 8)
      └── → /(main)/(tabs)
```

## Internationalization

The onboarding flow supports multiple languages through i18n. Translation keys are structured as:

```json
{
  "onboarding": {
    "language": {
      "title": "...",
      "subtitle": "..."
    },
    "dietaryPreferences": { ... },
    "allergensScreen": { ... },
    // etc.
  }
}
```

## Permissions

The onboarding flow requests the following permissions:

1. **Camera** (Optional) - For food scanning and menu translation
2. **Notifications** (Optional) - For nutrition reminders and insights
3. **Location** (Optional) - For restaurant recommendations

All permissions are optional and can be enabled/disabled later in settings.

## Testing

To test the onboarding flow:

1. Reset the onboarding state:
```typescript
const { resetOnboarding } = useOnboardingStore();
resetOnboarding();
```

2. Navigate to onboarding:
```typescript
router.push('/(onboarding)');
```

3. Complete all steps and verify:
   - Progress indicator updates correctly
   - Data is saved in the store
   - Navigation flows work
   - Calculations are accurate
   - Permissions are requested properly

## Future Enhancements

- [ ] Add skip functionality for optional steps
- [ ] Add visual illustrations for each step
- [ ] Add animations between steps
- [ ] Save progress to persist incomplete onboarding
- [ ] Add A/B testing for different onboarding flows
- [ ] Add analytics tracking for drop-off rates
- [ ] Support for additional languages
- [ ] Custom macro ratio configuration
- [ ] Import health data from Apple Health/Google Fit
