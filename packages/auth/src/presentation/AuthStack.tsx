import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import LoginScreen from './screens/LoginScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import RegisterScreen from './screens/RegisterScreen'
import { Color, GeneralStyle, useI18n } from '@app/common'
import { useNavigation } from '@react-navigation/native'

type ParamList = {
  loginScreen: undefined
  registerScreen: { email?: string }
  forgotPasswordScreen: { email?: string }
}

const Stack = createNativeStackNavigator<ParamList>()

const AuthStack: FC = (): JSX.Element => {
  const { t } = useI18n()
  const navigation = useNavigation()
  return (
    <Stack.Navigator
      id={navigation.getParent()}
      initialRouteName="loginScreen"
      screenOptions={GeneralStyle.header}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="loginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          headerBackButtonDisplayMode: 'minimal',
          title: t('registerScreen.title'),
        }}
        name="registerScreen"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{
          headerBackButtonDisplayMode: 'minimal',
          title: t('forgotPasswordScreen.title'),
        }}
        name="forgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  )
}

export { AuthStack, ParamList }
