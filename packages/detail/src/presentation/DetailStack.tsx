import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DetailScreen } from './screens/DetailScreen'

const Stack = createNativeStackNavigator()

const DetailStack: FC = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="detail"
        component={DetailScreen}
        options={{ headerTitle: 'Detail' }}
      />
    </Stack.Navigator>
  )
}

export { DetailStack }
