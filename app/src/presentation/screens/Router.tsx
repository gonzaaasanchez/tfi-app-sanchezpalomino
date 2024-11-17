import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { HomeTabs } from '@app/home'
import { AuthStack } from '@app/auth'
import { DashboardStack } from '@app/dashboard'
import { FactoringStack } from '@app/factoring'
import { FuelingStack } from '@app/fueling'
import { LoadsStack } from '@app/loads'
import { MoreStack } from '@app/more'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useRouterViewModel } from '../viewModels/ViewModel'
import { DetailStack } from '@packages/detail'
import { linking } from './Linking'

const HomeStack = createNativeStackNavigator<HomeParamsList>()

/**
 * Type definition for HomeParamsList.
 *
 * @property {undefined} homeScreen - The home screen parameter.
 * @property {undefined} detailScreen - The detail screen parameter.
 * @notExported
 */
type HomeParamsList = {
  homeScreen: undefined
  detailScreen: undefined
}

/**
 * Router component that renders either the authentication stack or the
 * home stack based on the authentication state.
 *
 * @returns {JSX.Element} The rendered Router component.
 */
const Router = (): JSX.Element => {
  const { state } = useRouterViewModel()

  if (state.loading === true) {
    return <></>
  }

  return (
    <NavigationContainer linking={linking}>
      {state.isLoggedIn ? (
        <HomeStack.Navigator>
          <HomeStack.Screen
            name="homeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <HomeStack.Screen
            name="detailScreen"
            component={DetailStack}
            options={{ headerShown: false }}
          />
          {/* // Add more screens here */}
        </HomeStack.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  )
}

/**
 * Renders the HomeScreen component, which is the main screen of the app. It
 * displays a HomeTabs component, which is a tab navigator that contains screens
 * for the dashboard, factoring, fueling, loads, and more.
 *
 * @returns {JSX.Element} The rendered HomeScreen component.
 * @notExported
 */
const HomeScreen = (): JSX.Element => {
  return (
    <HomeTabs
      dashboard={DashboardStack}
      factoring={FactoringStack}
      fueling={FuelingStack}
      loads={LoadsStack}
      more={MoreStack}
    />
  )
}

export { Router }
