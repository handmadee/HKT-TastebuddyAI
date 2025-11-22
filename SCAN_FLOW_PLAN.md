# Scan Flow Implementation Plan

## Overview
Implement food scanning feature: Camera → Analysis → Allergen Check → Results

## Flow Screens
1. **ScanScreen** - Camera interface with capture button
2. **AnalyzingScreen** - Loading/processing animation
3. **AllergenWarningScreen** - Red warning if allergens detected
4. **ResultScreen** - Dish details with nutrition info

## Architecture

### Feature Structure
```
src/features/scan/
├── components/
│   ├── CameraView.tsx         # Camera component
│   ├── CaptureButton.tsx      # Capture button
│   ├── AnalyzingAnimation.tsx # Loading animation
│   ├── AllergenAlert.tsx      # Allergen warning card
│   ├── NutritionCard.tsx      # Nutrition display
│   └── IngredientsList.tsx    # Ingredients list
├── screens/
│   ├── ScanScreen.tsx          # Main camera screen
│   ├── AnalyzingScreen.tsx     # Processing screen
│   ├── AllergenWarningScreen.tsx # Warning screen
│   └── ResultScreen.tsx        # Results screen
├── stores/
│   └── scanStore.ts           # Scan state management
├── types/
│   └── index.ts               # TypeScript types
├── utils/
│   └── allergenChecker.ts     # Allergen detection logic
├── services/
│   └── foodDetectionService.ts # API integration
└── constants/
    └── mockData.ts            # Mock data for testing
```

### Types
```typescript
interface FoodScanResult {
  id: string;
  name: string;
  confidence: number;
  imageUri: string;
  nutrition: Nutrition;
  ingredients: Ingredient[];
  allergens: DetectedAllergen[];
  timestamp: string;
}

interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface Ingredient {
  name: string;
  amount?: string;
}

interface DetectedAllergen {
  type: AllergenType;
  severity: 'mild' | 'moderate' | 'severe';
  confidence: number;
}
```

### State Management (Zustand)
```typescript
interface ScanState {
  currentScan: FoodScanResult | null;
  scanHistory: FoodScanResult[];
  isScanning: boolean;
  isAnalyzing: boolean;
  error: string | null;

  startScan: () => void;
  analyzeFoodImage: (imageUri: string) => Promise<void>;
  saveScanResult: (result: FoodScanResult) => Promise<void>;
  clearCurrentScan: () => void;
}
```

### Navigation Flow
```
/scan (Camera)
  → /scan/analyzing
  → /scan/allergen-warning (if allergens detected)
  → /scan/result
```

## Implementation Steps

### Phase 1: Structure Setup
- [x] Create feature directory
- [x] Define types
- [x] Create store skeleton
- [x] Set up constants/mock data

### Phase 2: Components
- [ ] CameraView component
- [ ] CaptureButton component
- [ ] AnalyzingAnimation component
- [ ] AllergenAlert component
- [ ] NutritionCard component
- [ ] IngredientsList component

### Phase 3: Screens
- [ ] ScanScreen with camera integration
- [ ] AnalyzingScreen with loading state
- [ ] AllergenWarningScreen with warnings
- [ ] ResultScreen with nutrition details

### Phase 4: Business Logic
- [ ] Food detection service
- [ ] Allergen checker utility
- [ ] Store implementation
- [ ] Navigation setup

### Phase 5: Testing
- [ ] Component tests
- [ ] Store tests
- [ ] Integration tests
- [ ] E2E flow test

## Reused Components
- `BaseButton` from shared/components/base
- `Screen` from shared/components/layout
- `Loading` from shared/components/feedback
- `usePermissions` hook for camera access

## Dependencies
- expo-camera (already installed)
- expo-image-picker (for gallery)
- @react-native-community/blur (for blur effects)

## Mock Data Strategy
Use mock data initially, prepare for API integration later

## Testing Requirements
- Camera permission handling
- Image capture and analysis
- Allergen detection logic
- Navigation flow
- Error states
- Offline support
