import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { ResolverProvider } from '@app/common'
import { Router } from './presentation/screens/Router'
import { store } from './domain/store/Store'
import { Provider } from 'react-redux'
import { resolver } from './domain/di/Register'

/**
 * The main component of the app.
 *
 * Renders the app's UI hierarchy by wrapping the Router component with Redux Provider and ResolverProvider.
 *
 * @return {JSX.Element} The main component of the app.
 */
const App = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ResolverProvider resolver={resolver}>
        <Provider store={store}>
          <Router />
        </Provider>
      </ResolverProvider>
    </View>
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
