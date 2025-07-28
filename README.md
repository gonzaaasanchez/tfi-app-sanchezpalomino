# TFI App - Sanchez Palomino

This is a React Native mobile application for pet care services, built with a modern architecture that provides a solid foundation for cross-platform development.

The app follows a Package-by-Feature (PBF) Architecture where each feature is self-contained. Each package implements CLEAN architecture principles with an MVVM approach for the presentation layer. It uses Dependency Injection and Interfaces to facilitate communication between packages and enable comprehensive testing.

This project demonstrates best practices in React Native development, featuring a scalable architecture that allows the team to focus on building features while maintaining high code quality and testing standards.

## Features

- 🐾 **Pet Care Services** - Complete platform for pet owners and caregivers
- 👤 **User Authentication** - Secure login, registration, and password recovery
- 📱 **Feed System** - Social feed for sharing pet photos and stories
- 🔍 **Service Discovery** - Find and book pet care services
- 📅 **Reservation Management** - Book and manage pet care appointments
- 💳 **Payment Integration** - Secure payment processing for services
- 📍 **Location Services** - Find nearby pet care providers
- 🌎 **Multi-language Support** - Internationalization (i18n) for global reach
- 🧪 **Comprehensive Testing** - Unit tests, snapshot tests, and E2E testing
- 📱 **Cross-platform** - iOS and Android support with React Native + Expo
- 🚀 **Modern Architecture** - Clean Architecture with MVVM pattern
- 🔧 **Dependency Injection** - Scalable and testable code structure

## Prerequisites

Before you begin, please ensure you have the following tools installed:

### Development Environment

- **Node.js** (v20.x or higher)
- **Yarn** (v1.22.x or higher)
- **Xcode** (for iOS development)
- **Android Studio** (for Android development)

### Production Setup

- **Expo Application Services (EAS)** (v11.4.x or higher)
- [An Expo account](https://expo.dev)

### Configuration Required

The following values need to be updated in `app/app.json`:
- `expo.ios.bundleIdentifier`
- `expo.ios.associatedDomains`
- `expo.android.package`
- `expo.android.intentFilters.data.host`
- `expo.owner`
- `expo.extra.eas.projectId`
- `expo.update.url`

For deep linking, update:
- `prefixes` in `app/src/presentation/screens/Linking.ts`

For E2E testing, update:
- `appId` in the files `e2e/*.yml`

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/gonzaaasanchez/tfi-app-sanchezpalomino
   cd tfi-app-sanchezpalomino
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Run the app**

   For iOS:

   ```bash
   yarn ios
   ```

   For Android:

   ```bash
   yarn android
   ```

## Project Structure

The app is organized into feature-based packages:

- **`packages/auth`** - User authentication (login, register, forgot password)
- **`packages/feed`** - Social feed for sharing pet content
- **`packages/reserves`** - Reservation and booking system
- **`packages/services`** - Pet care service discovery
- **`packages/more`** - User profile and settings
- **`packages/common`** - Shared components and utilities

## Technologies Used

- **React Native + Expo** - Cross-platform mobile development with simplified tooling
- **React Navigation** - Navigation between screens with stack, tab, and drawer support
- **Inversify** - Dependency injection for scalable and testable architecture
- **Redux** - State management for complex application data
- **Axios** - HTTP client for API communication
- **React-i18next** - Internationalization for multi-language support
- **Jest** - Unit and snapshot testing framework
- **Maestro** - End-to-end testing for complete user experience validation

## Architecture

This project follows Clean Architecture principles with:

- **Domain Layer** - Business logic and entities
- **Data Layer** - API communication and local storage
- **Presentation Layer** - UI components with MVVM pattern
- **Dependency Injection** - Loose coupling between layers
- **Package-by-Feature** - Self-contained feature modules
