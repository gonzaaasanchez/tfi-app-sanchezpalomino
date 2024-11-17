import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import LoginScreen from './screens/LoginScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import RegisterScreen from './screens/RegisterScreen'
import { Color, useI18n } from '@app/common'

type ParamList = {
  loginScreen: undefined
  registerScreen: {
    email?: string
  }
  forgotPasswordScreen: {
    email?: string
  }
}

const Stack = createNativeStackNavigator<ParamList>()

const AuthStack: FC = (): JSX.Element => {
  const { t } = useI18n()

  return (
    <Stack.Navigator
      initialRouteName="loginScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: Color.brand1[700],
        },
        headerTintColor: 'white',
        headerTitleStyle: { fontSize: 18 },
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="loginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          title: t('registerScreen.title'),
        }}
        name="registerScreen"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          title: t('forgotPasswordScreen.title'),
        }}
        name="forgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  )
}

export { AuthStack, ParamList }
