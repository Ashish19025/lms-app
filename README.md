# LMS Mobile App (Expo) - Mini LMS Assignment

## Overview

This project is a production-oriented Mini LMS (Learning Management System) mobile application built using React Native Expo and TypeScript. The application demonstrates scalable mobile architecture, state management, secure authentication handling, WebView integration, offline support strategies, performance optimization, and modern React Native development practices.

The application was developed as part of a React Native Expo developer assessment.

---

# Tech Stack

| Technology           | Purpose                               |
| -------------------- | ------------------------------------- |
| React Native Expo    | Mobile app framework                  |
| TypeScript           | Strong typing and maintainability     |
| Expo Router          | Navigation architecture               |
| Zustand              | Global state management               |
| Axios                | API communication                     |
| Expo SecureStore     | Secure token storage                  |
| AsyncStorage         | Persistent local app data             |
| NativeWind           | Tailwind styling for React Native     |
| React Hook Form      | Form handling                         |
| Zod                  | Validation and schema management      |
| Expo Notifications   | Local notifications                   |
| React Native WebView | Embedded course content               |
| Expo Image           | Optimized image rendering and caching |
| NetInfo              | Network monitoring                    |

---

# Features Implemented

## Authentication & User Management

* Login and Register screens
* Secure token storage using Expo SecureStore
* Auto-login session restoration
* Logout functionality
* Token refresh handling with Axios interceptors
* Form validation using Zod + React Hook Form

---

## Course Catalog

* Fetch courses from FreeAPI random products endpoint
* Fetch instructors from FreeAPI random users endpoint
* Instructor-to-course mapping layer
* Search functionality
* Pull-to-refresh support
* Course detail screen
* Bookmark functionality
* Local persistence for bookmarks

---

## WebView Integration

* Embedded course viewer
* Local HTML rendering
* Native ↔ Web communication using postMessage
* WebView loading and error handling

---

## Notifications

* Notification permission handling
* Bookmark milestone notification (5+ bookmarks)
* Inactivity reminder notification
* Notification screen UI

---

## Performance Optimizations

* Zustand selector-based subscriptions
* Memoized reusable components
* Optimized FlatList rendering
* Cached image handling using Expo Image
* Reduced unnecessary re-renders
* Separation of business logic from UI

---

## Error Handling & Resilience

* Retry mechanism for API requests
* Timeout handling
* Offline network detection
* Graceful fallback UI states
* Error boundaries and safe rendering patterns
* Fallback image strategy for unstable external CDN assets

---

# Folder Structure

```txt
src/
│
├── app/                     # Expo Router screens
│   ├── (auth)/              # Authentication screens
│   ├── (tabs)/              # Main tab navigation
│   ├── course/              # Course detail screens
│   ├── webview/             # WebView screens
│   └── _layout.tsx          # Root navigation layout
│
├── components/              # Reusable UI components
│   ├── course/
│   ├── ui/
│   └── common/
│
├── hooks/                   # Custom reusable hooks
│
├── services/                # API, storage, notifications
│   ├── api/
│   ├── storage/
│   ├── notifications/
│   └── image/
│
├── store/                   # Zustand global stores
│
├── schemas/                 # Zod validation schemas
│
├── types/                   # TypeScript types/interfaces
│
├── utils/                   # Utility/helper functions
│
├── assets/                  # Static assets
│
└── theme/                   # Theme and design tokens
```

---

# Architecture Decisions

## Why Zustand?

Zustand was selected because it provides lightweight and scalable global state management with minimal boilerplate. Compared to heavier alternatives such as Redux, Zustand offers:

* Simpler architecture
* Better developer experience
* Selector-based subscriptions for performance optimization
* Minimal re-rendering
* Easy TypeScript integration

This architecture helps maintain scalability while keeping the codebase clean and maintainable.

---

## Why Expo SecureStore?

Authentication tokens are stored using Expo SecureStore because tokens are sensitive data and require encryption.

Benefits:

* Encrypted local storage
* Uses iOS Keychain and Android Keystore internally
* Better security than AsyncStorage
* Production-grade token persistence

---

## Why AsyncStorage?

AsyncStorage is used for non-sensitive persistent data such as:

* Bookmarks
* Cached course data
* Preferences
* User settings

This improves:

* Offline experience
* Startup performance
* Reduced API calls

---

## Why Expo Router?

Expo Router was used for:

* File-based routing
* Scalable navigation structure
* Nested navigation support
* Cleaner route organization
* Better developer experience

The navigation architecture separates:

* Authentication flow
* Main tab navigation
* Stack-based detail screens

---

# State Management Strategy

## Global State (Zustand)

The following states are managed globally:

* Authentication state
* Courses
* Bookmarks
* Notifications
* App preferences
* Loading/error states

---

## Persistent Storage Strategy

| Data           | Storage          |
| -------------- | ---------------- |
| Auth Token     | Expo SecureStore |
| Refresh Token  | Expo SecureStore |
| Bookmarks      | AsyncStorage     |
| Cached Courses | AsyncStorage     |
| Preferences    | AsyncStorage     |

---

# API Architecture

## API Client

A centralized Axios client was implemented to handle:

* Base configuration
* Timeout handling
* Retry logic
* Token injection
* Response interceptors
* Refresh token handling

Location:

```txt
src/services/api/client.ts
```

---

## API Layer Separation

The application separates:

* API communication
* Business logic
* State management
* UI rendering

Flow:

```txt
UI
↓
Hooks
↓
Zustand Store
↓
API Services
↓
Axios Client
↓
Backend API
```

This architecture improves:

* Maintainability
* Scalability
* Testing
* Reusability

---

# Authentication Flow

```txt
User Login
    ↓
API Request
    ↓
Token Received
    ↓
Store Token in SecureStore
    ↓
Update Zustand Auth State
    ↓
Navigate to Main App
```

---

# Session Restoration Flow

```txt
App Launch
    ↓
Read Token from SecureStore
    ↓
Validate Session
    ↓
Restore Zustand State
    ↓
Auto Login
```

---

# Bookmark Flow

```txt
User Bookmarks Course
        ↓
Update Zustand Store
        ↓
Persist to AsyncStorage
        ↓
UI Updates Automatically
```

---

# Offline & Resilience Strategy

The app implements several resilience mechanisms:

* Network monitoring using NetInfo
* Retry handling for transient failures
* Timeout handling for stalled requests
* Offline fallback UI
* Local persistence of important app data
* Reduced dependency on continuous internet access

---

# Media Handling Strategy

The FreeAPI product image CDN occasionally fails in Expo environments. To ensure consistent rendering:

* A dedicated image service layer was implemented
* Fallback image handling was added
* Category-based image mapping was used
* Cached image rendering was implemented with Expo Image

This improves:

* Reliability
* Performance
* User experience

---

# Form Validation Strategy

The app uses:

* React Hook Form for form state management
* Zod for schema validation

Benefits:

* Type-safe validation
* Centralized schema management
* Reusable validation rules
* Better scalability
* Improved maintainability

Validation schemas are organized inside:

```txt
src/schemas/
```

---

# Navigation Structure

```txt
(auth)
   ├── login
   └── register

(tabs)
   ├── home
   ├── bookmarks
   ├── notifications
   ├── profile
   └── settings

Stack Screens
   ├── course/[id]
   └── webview/[id]
```

This structure separates:

* Authentication routes
* Primary navigation
* Detail screens

---

# Notifications

Implemented notifications include:

## Bookmark Milestone Notification

Triggered when the user bookmarks 5 or more courses.

---

## Inactivity Reminder Notification

Scheduled reminder when the user has not opened the app for 24 hours.

---

# Security Considerations

* Secure token storage using Expo SecureStore
* Sensitive data separated from AsyncStorage
* Axios interceptors for centralized auth handling
* Input validation using Zod schemas
* Safe fallback handling for API failures

---

# Environment Variables

The application uses the FreeAPI base URL:

```txt
https://api.freeapi.app
```

To change the API base URL:

Update:

```txt
src/services/api/client.ts
```

---

# Installation & Setup

## Requirements

* Node.js 16+
* npm or yarn
* Expo CLI

---

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm start
```

---

## Run TypeScript Checks

```bash
npx tsc --noEmit
```

---

# Build & Deployment

## EAS Build

```bash
eas build --platform android --profile preview
```

---

## Local Android Build

```bash
npx expo prebuild --clean
cd android
./gradlew assembleRelease
```

---

# Screenshots

## Authentication

* Login Screen
* Register Screen

---

## Main Screens

* Home Screen
* Bookmarks Screen
* Notifications Screen
* Profile Screen

---

## Course Features

* Course Details
* WebView Screen

---

# Known Limitations

* FreeAPI image assets may intermittently fail in Expo environments
* Refresh token endpoint depends on backend support
* Additional accessibility improvements can still be implemented
* More automated tests can be added

---

# Future Improvements

Potential future enhancements include:

* Dark mode support
* Unit testing and integration testing
* CI/CD pipeline improvements
* Enhanced offline synchronization
* Better accessibility support
* Advanced animations using Reanimated
* AI-powered course recommendations

---

# Conclusion

This project focuses on scalable mobile architecture, production-oriented engineering practices, clean separation of concerns, secure authentication handling, resilient networking strategies, and optimized user experience.
