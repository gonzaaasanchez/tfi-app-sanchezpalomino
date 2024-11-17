import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DashboardScreen } from './screens/DashboardScreen'

const Stack = createNativeStackNavigator()

const DashboardStack: FC = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="dashboardStack"
        component={DashboardScreen}
        options={{ headerTitle: 'Dashboard' }}
      />
    </Stack.Navigator>
  )
}

export { DashboardStack }
