# LMS Mobile App (Expo) - Mini Assignment

This repository contains a React Native Expo app (TypeScript) created as a mini LMS assignment.

## Requirements
- Node.js (16+)
- npm or yarn
- Expo CLI

## Setup
1. Install dependencies

```powershell
npm install
```

2. Run the app

```powershell
npm start
```

3. Type-check

```powershell
npx tsc --noEmit
```

## Architecture notes
- State: `zustand` stores in `src/store/*` (auth, courses, notifications, app)
- API client: `src/services/api/client.ts` (axios with retry and refresh token flow)
- Auth tokens: `expo-secure-store` via `src/services/storage/secureStorage.ts`
- Persistent non-sensitive data: `@react-native-async-storage/async-storage`
- WebView: `src/app/webview/[id].tsx` with bidirectional postMessage support
- Styling: `nativewind` (Tailwind for RN)

## Notable features implemented
- Login / Register flows with token storage and auto-login
- Token refresh handling on 401 responses (uses `/api/v1/users/refresh` endpoint if available)
- Course catalog using FreeAPI endpoints (`/public/randomproducts`, `/public/randomusers`)
- Bookmarks persisted to AsyncStorage and milestone notification when 5 bookmarks reached
- WebView integration with local HTML and native <-> web messaging
- Notifications via `expo-notifications` including scheduled inactivity reminder
- Network retry/backoff for transient API errors

## Environment variables
The app uses the FreeAPI base URL (`https://api.freeapi.app`) by default. If you need to change the API base URL, update `src/services/api/client.ts`.

## Build & Deployment

### EAS Build (Recommended)
```powershell
eas build --platform android --profile preview
```

This generates a shareable APK link. See [DEPLOYMENT.md](./DEPLOYMENT.md) for full instructions.

### GitHub Actions CI/CD
Automated builds on every push:
1. Add `EXPO_TOKEN` secret to GitHub repo
2. Push code → GitHub Actions builds automatically
3. Download APK from EAS Dashboard

### Local Build
```powershell
npx expo prebuild --clean
cd android
./gradlew assembleRelease
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Known limitations / TODO
- Token refresh requires the API to implement `/api/v1/users/refresh`. If not available, the app falls back to sign-out on 401.
- More tests and CI pipeline are recommended.
- Some components can be further optimized and accessibility improved.

## Next steps I can implement
- Add a GitHub Actions workflow to build an APK
- Add unit and integration tests (Jest + Testing Library)
- Improve accessibility and add dark mode

---

If you'd like, I can now implement token refresh fallback improvements, add CI, or expand tests. Tell me which next step you want prioritized.