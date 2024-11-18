import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ServicesScreen } from './screens/ServicesScreen'

const Stack = createNativeStackNavigator()

const ServicesStack: FC = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="servicesStack"
        component={ServicesScreen}
        options={{ headerTitle: 'Services' }}
      />
    </Stack.Navigator>
  )
}

export { ServicesStack }
