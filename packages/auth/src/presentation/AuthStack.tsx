import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import LoginScreen from './screens/LoginScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import RegisterScreen from './screens/RegisterScreen'
import { useI18n } from '@app/common'

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
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="loginScreen" component={LoginScreen} />
      <Stack.Screen name="registerScreen" component={RegisterScreen} />
      <Stack.Screen
        name="forgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  )
}

export { AuthStack, ParamList }
