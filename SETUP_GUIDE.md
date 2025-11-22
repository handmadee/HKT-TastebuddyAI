# TastebuddyAI - Setup & Run Guide

## 📋 Prerequisites

- **Node.js**: 20.19.4 or higher
- **npm** or **yarn**
- **Expo CLI**: Will be installed with dependencies
- **iOS Simulator** (Mac only) or **Android Emulator**

---

## 🚀 Installation Steps

### 1. Install Dependencies

```bash
cd /Users/admin/Hackathon_1/TastebuddyAI
npm install
```

This will install:
- Expo 54 + React Native 0.76
- i18next for internationalization
- Zustand for state management
- React Native Paper for UI components
- All other dependencies

### 2. Set Up Environment Variables

```bash
cp .env.example .env
```

Then edit `.env` and add your API keys:
```bash
EXPO_PUBLIC_API_BASE_URL=https://your-api.com/v1
EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS=your_ios_client_id
# ... etc
```

---

## 🏃 Running the App

### Start Development Server

```bash
npm start
```

This will open Expo Developer Tools in your browser.

### Run on iOS (Mac only)

```bash
npm run ios
```

Or press `i` in the terminal after `npm start`

### Run on Android

```bash
npm run android
```

Or press `a` in the terminal after `npm start`

### Run on Web

```bash
npm run web
```

Or press `w` in the terminal after `npm start`

---

## 📱 Running on Physical Device

### Option 1: Expo Go App (Easiest)

1. Install **Expo Go** from App Store (iOS) or Google Play (Android)
2. Run `npm start`
3. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

### Option 2: Development Build (For Native Modules)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build development version
eas build --profile development --platform ios
# or
eas build --profile development --platform android
```

---

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Check Coverage

```bash
npm run test:coverage
```

---

## 🔍 Code Quality

### Type Check

```bash
npm run type-check
```

### Lint

```bash
npm run lint
```

---

## 📂 Project Structure Overview

```
TastebuddyAI/
├── app/                      # Expo Router (screens)
│   ├── _layout.tsx          # Root layout with providers
│   └── index.tsx            # Entry point
├── src/
│   ├── features/            # Feature modules (TO BE ADDED)
│   ├── shared/              # Shared code
│   │   ├── components/      # Base components
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # API, i18n, storage
│   │   ├── stores/          # Zustand stores
│   │   ├── utils/           # Utilities
│   │   └── constants/       # Constants
│   └── theme/               # Design system
├── assets/                  # Images, fonts, icons
├── app.json                 # Expo config
├── package.json             # Dependencies
└── tsconfig.json            # TypeScript config
```

---

## ✅ Verification Checklist

After installation, verify:

- [ ] `npm install` completed without errors
- [ ] `npm start` opens Expo DevTools
- [ ] App loads on simulator/emulator
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] i18n working (app shows translated text)
- [ ] Theme system working (colors, typography applied)

---

## 🐛 Common Issues

### Issue: `npm install` fails with EBADENGINE

**Solution:** Update Node.js to 20.19.4+
```bash
# Using nvm
nvm install 20.19.4
nvm use 20.19.4
```

### Issue: Metro bundler won't start

**Solution:** Clear cache and restart
```bash
npm start -- --clear
```

### Issue: iOS build fails

**Solution:** 
```bash
cd ios
pod install
cd ..
npm run ios
```

### Issue: Android emulator not detected

**Solution:**
1. Open Android Studio
2. AVD Manager → Create Virtual Device
3. Start emulator, then run `npm run android`

### Issue: "Invariant Violation" or module errors

**Solution:**
```bash
# Clear all caches
rm -rf node_modules
npm cache clean --force
npm install
npm start -- --clear
```

---

## 📖 Next Steps

1. **Explore the App**
   - Open `app/index.tsx` to see the entry point
   - Navigate to `src/shared/components/` to see base components
   - Check `src/theme/` for design system

2. **Start Development**
   - Create auth screens in `app/(auth)/`
   - Build scanner feature in `src/features/scanner/`
   - Customize theme in `src/theme/colors.ts`

3. **Learn More**
   - [Expo Documentation](https://docs.expo.dev/)
   - [React Native Paper](https://callstack.github.io/react-native-paper/)
   - [Zustand](https://zustand-demo.pmnd.rs/)
   - [i18next](https://www.i18next.com/)

---

## 🆘 Need Help?

- **Expo Issues**: [Expo Forums](https://forums.expo.dev/)
- **React Native**: [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)
- **Project Issues**: Check implementation plan and walkthrough docs

---

**Happy Coding! 🎉**
