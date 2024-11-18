import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ServicesScreen } from './screens/ServicesScreen'
import { GeneralStyle, useI18n } from '@packages/common'

const Stack = createNativeStackNavigator()

const ServicesStack: FC = (): JSX.Element => {
  const { t } = useI18n()

  return (
    <Stack.Navigator screenOptions={GeneralStyle.header}>
      <Stack.Screen
        name="servicesStack"
        component={ServicesScreen}
        options={{ headerTitle: t('servicesScreen.title') }}
      />
    </Stack.Navigator>
  )
}

export { ServicesStack }
