import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ReservesScreen } from './screens/ReservesScreen'
import { GeneralStyle } from '@packages/common'

const Stack = createNativeStackNavigator()

const ReservesStack: FC = (): JSX.Element => {
  return (
    <Stack.Navigator screenOptions={GeneralStyle.header}>
      <Stack.Screen
        name="reservesStack"
        component={ReservesScreen}
        options={{ headerTitle: 'Reserves' }}
      />
    </Stack.Navigator>
  )
}

export { ReservesStack }
