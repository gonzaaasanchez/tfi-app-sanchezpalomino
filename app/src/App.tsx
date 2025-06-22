import React, { useCallback, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { GenericToast, ResolverProvider, useAppInitialization } from '@app/common'
import { Router } from './presentation/screens/Router'
import { store } from './domain/store/Store'
import { Provider } from 'react-redux'
import { resolver } from './domain/di/Register'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import 'react-native-get-random-values'; /* Necessary in order to install 'react-native-google-places-autocomplete;' ISSUE https://stackoverflow.com/questions/79144560/react-native-google-places-autocomplete-not-working-for-expo */

const AppContent = (): JSX.Element => {
  const [loaded, error] = useFonts({
    'SourGummy-Black': require('app/assets/fonts/SourGummy-Black.ttf'),
    'SourGummy-Bold': require('app/assets/fonts/SourGummy-Bold.ttf'),
    'SourGummy-ExtraBold': require('app/assets/fonts/SourGummy-ExtraBold.ttf'),
    'SourGummy-ExtraLight': require('app/assets/fonts/SourGummy-ExtraLight.ttf'),
    'SourGummy-Light': require('app/assets/fonts/SourGummy-Light.ttf'),
    'SourGummy-Medium': require('app/assets/fonts/SourGummy-Medium.ttf'),
    'SourGummy-Regular': require('app/assets/fonts/SourGummy-Regular.ttf'),
    'SourGummy-SemiBold': require('app/assets/fonts/SourGummy-SemiBold.ttf'),
    'SourGummy-Thin': require('app/assets/fonts/SourGummy-Thin.ttf'),
  })

  // Initialize app authentication data
  useAppInitialization()

  const hideSplashScreen = useCallback(async () => {
    if (loaded && !error) {
      await SplashScreen.hideAsync()
    }
  }, [loaded, error])

  useEffect(() => {
    hideSplashScreen()
  }, [hideSplashScreen])

  if (!loaded && !error) {
    return null
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Router />
    </View>
  )
}

const App = (): JSX.Element => {
  const [loaded, error] = useFonts({
    'SourGummy-Black': require('app/assets/fonts/SourGummy-Black.ttf'),
    'SourGummy-Bold': require('app/assets/fonts/SourGummy-Bold.ttf'),
    'SourGummy-ExtraBold': require('app/assets/fonts/SourGummy-ExtraBold.ttf'),
    'SourGummy-ExtraLight': require('app/assets/fonts/SourGummy-ExtraLight.ttf'),
    'SourGummy-Light': require('app/assets/fonts/SourGummy-Light.ttf'),
    'SourGummy-Medium': require('app/assets/fonts/SourGummy-Medium.ttf'),
    'SourGummy-Regular': require('app/assets/fonts/SourGummy-Regular.ttf'),
    'SourGummy-SemiBold': require('app/assets/fonts/SourGummy-SemiBold.ttf'),
    'SourGummy-Thin': require('app/assets/fonts/SourGummy-Thin.ttf'),
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null
  }

  return (
    <>
      <Provider store={store}>
        <ResolverProvider resolver={resolver}>
          <AppContent />
        </ResolverProvider>
      </Provider>
      <GenericToast />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
})

export default App
