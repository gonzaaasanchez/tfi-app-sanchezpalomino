import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import LoginScreen from './screens/LoginScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import RegisterScreen from './screens/RegisterScreen'
import { useI18n } from '@app/common'

/**
 * Defines the shape of parameters for routes in a navigation stack.
 */
type ParamList = {
  /**
   * Parameters for the login screen (none).
   */
  loginScreen: undefined
  /**
   * Parameters for the register screen.
   *
   * @property {string} [email] - Optional email address.
   */
  registerScreen: {
    email?: string
  }
  /**
   * Parameters for the forgot password screen.
   *
   * @property {string} [email] - Optional email address.
   */
  forgotPasswordScreen: {
    email?: string
  }
}

const Stack = createNativeStackNavigator<ParamList>()

/**
 * AuthStack is a navigation stack for authentication screens.
 *
 * It provides routes for logging in, registering, and resetting passwords.
 *
 * @returns {JSX.Element} The rendered AuthStack component.
 */
const AuthStack: FC = (): JSX.Element => {
  const { t } = useI18n()

  return (
    <Stack.Navigator initialRouteName="loginScreen">
      <Stack.Screen
        name="loginScreen"
        component={LoginScreen}
        options={{ title: t('loginScreen.title') }}
      />
      <Stack.Screen
        name="registerScreen"
        component={RegisterScreen}
        options={{ title: t('registerScreen.title') }}
      />
      <Stack.Screen
        name="forgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ title: t('forgotPasswordScreen.title') }}
      />
    </Stack.Navigator>
  )
}

export { AuthStack, ParamList }
