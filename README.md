# React Native Architecture Blueprint

This Architecture blueprint for a React Native project provides a solid kick-start for a cross-platform mobile app.

It consists of a Package-by-Feature (PBF) Architecture. Each package follows a CLEAN architecture, featuring an MVVM approach for the presentation layer. It uses Dependency Injection and Interfaces to facilitate communication between packages and testing.

The blueprint is intended for your team to save time on setup and focus on building features while effortlessly following best practices and coding standards.

## Features

- 🚀 **Pre-configured project architecture and structure** for easy scalability.
- 🛠 **Essential packages and libraries** pre-installed and configured out of the box.
- 🧩 **Reusable components** for faster development.
- 📱 **iOS and Android** development support out of the box.
- 🐞 **Integrated Testing** Pre-configured frameworks for Unit Test (Jest), Snapshot Test (Jest) and E2E Test (Maestro).
- 🌎 **Internationalization Support** Pre-configured Multi-language support (i18n).
- ⛳ **Pre-configured Expo Go and Customm Dev Client** allows for seamless development requiring native code run.
- ✈️ **Pre-configured Expo Update** allows for seamless Over The Air (OTA) updates.
- 🪓 **Pre-configured CI/CD with Expo Application Services (EAS)** allows for remote unit testing and creating development & production builds.

## Prerequisites

Before you begin, please ensure you have the following tools installed:

To run the sample:

- **Node.js** (v20.x or higher)
- **Yarn** (v1.22.x or higher)
- **Xcode** (for iOS development)
- **Android Studio** (for Android development)

To use the blueprint:

- **Expo Application Services (EAS)** (v11.4.x or higher)
- [An Expo account](https://expo.dev)
- Replace EnvVars and Application Configs (See app.json file, App Name and Icons)

- values to be updated in `app/app.json` file:
  - `expo.ios.bundleIdentifier`
  - `expo.ios.associatedDomains`
  - `expo.android.package`
  - `expo.android.intentFilters.data.host`
  - `expo.owner`
  - `expo.extra.eas.projectId`
  - `expo.update.url`
- for deeplinking this values should be updated:
  - `prefixes` in the file `app/src/presentation/screens/Linking.ts`
- for E2E testing this values should be updated:
  - `appId` in the files `e2e/*.yml`

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/gonzaaasanchez/tfi-app-sanchezpalomino my-awesome-project
   cd my-awesome-project
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

## Technologies Used

- **React Native + Expo (for cross-platform development)**: React Native allows the building of mobile apps using JavaScript and React. Expo extends React Native by providing a framework that simplifies development, with tools for building, running, and testing apps.
- **React Navigation (for routing and app navigation)**: React Navigation is a popular library for navigating between screens in React Native apps. It was chosen because it supports stack, tab, and drawer navigation and is flexible for customizing navigation flows.
- **Inversify (for dependency injection)**: Inversify is a powerful library for Dependency Injection (DI) in JavaScript/TypeScript applications. It allows the decoupling of classes by injecting dependencies rather than creating them directly.
- **Redux (for State management)**: Redux is a predictable state container for JavaScript apps, often used to manage complex application states across different screens and components.
- **Axios (for HTTP requests)**: Axios is a promise-based HTTP client for making network requests from the browser and Node.js.
- **React-i18next (for internationalization)**: is a robust internationalization framework that allows apps to easily support multiple languages and translations.
- **Jest (for Unit and Snapshot testing)**: Jest is a complete JavaScript testing framework with a focus on simplicity. In this architecture, it is used for both unit testing and snapshot testing.
- **Maestro (for E2E testing)**: Maestro is a lightweight tool for writing end-to-end tests in mobile apps. It interacts with the app as an actual user would, allowing for automation of the entire user experience.
