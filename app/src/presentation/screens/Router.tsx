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
import { LightTheme } from '@packages/common'

const HomeStack = createNativeStackNavigator<HomeParamsList>()

type HomeParamsList = {
  homeScreen: undefined
  detailScreen: undefined
}

const Router = (): JSX.Element => {
  const { state } = useRouterViewModel()

  if (state.loading === true) {
    return <></>
  }

  return (
    <NavigationContainer linking={linking} theme={LightTheme}>
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
        </HomeStack.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  )
}

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
