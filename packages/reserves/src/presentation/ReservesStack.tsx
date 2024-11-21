import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ReservesScreen } from './screens/ReservesScreen'
import { GeneralStyle, useI18n } from '@packages/common'

const Stack = createNativeStackNavigator()

const ReservesStack: FC = (): JSX.Element => {
  const { t } = useI18n()
  return (
    <Stack.Navigator screenOptions={GeneralStyle.header}>
      <Stack.Screen
        name="reservesStack"
        component={ReservesScreen}
        options={{ headerTitle: t('reservesScreen.title') }}
      />
    </Stack.Navigator>
  )
}

export { ReservesStack }
