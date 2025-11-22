# TastebuddyAI - AI-Powered Nutrition & Food Discovery App

## 🍽️ Overview

TastebuddyAI is a smart nutrition application that uses AI to analyze food, translate menus, and recommend personalized food choices based on your health goals.

## ✨ Features

- **🔍 Food Scanner**: Scan food items to get instant nutritional information
- **📋 Menu Translator**: Translate restaurant menus with nutritional insights
- **🏥 Health Profile**: Track your health metrics, goals, and progress
- **🎯 Smart Recommendations**: AI-powered restaurant and food suggestions
- **⚠️ Allergen Detection**: Automatically detect potential allergens in food
- **📊 Nutrition Tracking**: Monitor your daily calorie and macro intake

## 🏗️ Architecture

This project uses a **Feature-Based Architecture** with Clean Architecture principles:

```
src/
├── features/          # Feature modules (auth, scanner, menu, etc.)
├── shared/            # Shared components, hooks, services
├── theme/             # Design system (colors, typography, spacing)
└── navigation/        # Navigation configuration
```

### Key Design Decisions

- **Expo Router**: File-based routing for better DX
- **TypeScript**: Type safety throughout the app
- **Axios**: HTTP client with auto token refresh
- **Expo SecureStore**: Secure token storage
- **Feature-based modules**: Scalable, maintainable code organization

## 🚀 Getting Started

### Prerequisites

- Node.js 20.19.4 or higher
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd TastebuddyAI
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your API keys and configuration
```

4. Start the development server
```bash
npm start
```

5. Run on specific platform
```bash
npm run ios      # iOS Simulator
npm run android  # Android Emulator
npm run web      # Web browser
```

## 📱 Permissions

The app requires the following permissions:

- **Camera**: To scan food and menus
- **Photo Library**: To analyze food images
- **Location**: To find nearby restaurants
- **Microphone**: For voice features (optional)

## 🎨 Design System

Based on the COLORS.MD specification:

- **Primary Color**: `#017bff` (Blue)
- **Secondary Color**: `#38c85d` (Green)
- **Accent Color**: `#fe9402` (Orange)
- **Spacing**: 8px grid system
- **Typography**: SF Pro Display, Inter
- **Border Radius**: 8px (buttons/inputs), 12px (cards)

## 📂 Project Structure

See [Implementation Plan](docs/implementation_plan.md) for detailed structure.

## 🧪 Testing

```bash
npm test              # Run tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## 🔒 Security

- JWT-based authentication
- Secure token storage with Expo SecureStore
- Auto refresh token on 401
- Input validation and sanitization

## 🛠️ Tech Stack

- **Framework**: Expo 54 / React Native 0.76
- **Language**: TypeScript
- **Navigation**: Expo Router
- **HTTP Client**: Axios
- **Storage**: AsyncStorage + SecureStore
- **Camera**: Expo Camera
- **Location**: Expo Location

## 📝 License

[Add your license here]

## 👥 Contributors

[Add contributors here]
