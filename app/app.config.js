import 'dotenv/config';

export default {
  expo: {
    name: "PawPals",
    slug: "mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#f4d7bc"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.package.identifier",
      associatedDomains: [
        "applinks:{{ASSOCIATED_DOMAINS}}"
      ],
      infoPlist: {
        NSCameraUsageDescription: "Esta app necesita acceso a la cámara para tomar fotos de perfil",
        NSPhotoLibraryUsageDescription: "Esta app necesita acceso a la galería para seleccionar fotos de perfil"
      }
    },
    android: {
      package: "com.package.identifier",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#f4d7bc"
      },
      permissions: [
        "android.permission.CAMERA",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE"
      ],
      intentFilters: [
        {
          action: "VIEW",
          data: [
            {
              scheme: "mobile",
              host: "homeScreen"
            },
            {
              scheme: "mobile",
              host: "detailScreen"
            },
            {
              scheme: "https",
              host: "{{INTENT_FILTER_HOST}}"
            }
          ],
          category: [
            "BROWSABLE",
            "DEFAULT"
          ]
        }
      ]
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      eas: {
        projectId: "{{EAS_PROJECT_ID}}"
      },
      googlePlacesApiKey: process.env.GOOGLE_PLACES_API_KEY,
    },
    owner: "{{EAS_PROJECT_OWNER}}",
    plugins: [
      [
        "expo-font",
        {
          fonts: [
            "./assets/fonts/SourGummy-Black.ttf",
            "./assets/fonts/SourGummy-Bold.ttf",
            "./assets/fonts/SourGummy-ExtraBold.ttf",
            "./assets/fonts/SourGummy-ExtraLight.ttf",
            "./assets/fonts/SourGummy-Light.ttf",
            "./assets/fonts/SourGummy-Medium.ttf",
            "./assets/fonts/SourGummy-Regular.ttf",
            "./assets/fonts/SourGummy-SemiBold.ttf",
            "./assets/fonts/SourGummy-Thin.ttf"
          ]
        }
      ],
      [
        "expo-image-picker",
        {
          photosPermission: "Esta app necesita acceso a la galería para seleccionar fotos de perfil",
          cameraPermission: "Esta app necesita acceso a la cámara para tomar fotos de perfil"
        }
      ]
    ],
    runtimeVersion: {
      policy: "appVersion"
    },
    updates: {
      url: "{{EXPO_UPDATE_URL}}"
    }
  }
}; 