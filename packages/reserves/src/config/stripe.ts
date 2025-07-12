import Constants from 'expo-constants'
import * as Linking from 'expo-linking'

export const STRIPE_CONFIG = {
  publishableKey:
    'pk_test_51Rj9DjQ7iFCMGf3YxEzUK0BZccCWVdmRuF7Viug6847Hjxp22Lg2AfDLeJ5mvCfDl6JbTbikmRPmfL7VEugO4tVY00ZV80RjDU',
  currency: 'ars',
  merchantDisplayName: 'PawPals',
}

// Helper function to get the correct URL scheme for Expo
export const getUrlScheme = () => {
  if (typeof Constants !== 'undefined' && Constants.appOwnership === 'expo') {
    return Linking.createURL('/--/')
  }
  // For development and production builds, use the app's URL scheme
  return 'com.pawpals.pawpalsapp://'
}
