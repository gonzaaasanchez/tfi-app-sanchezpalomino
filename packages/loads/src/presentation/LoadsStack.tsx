import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoadsScreen } from './screens/LoadsScreen'

const Stack = createNativeStackNavigator()

const LoadsStack: FC = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="loadsStack"
        component={LoadsScreen}
        options={{ headerTitle: 'Loads' }}
      />
    </Stack.Navigator>
  )
}

export { LoadsStack }
