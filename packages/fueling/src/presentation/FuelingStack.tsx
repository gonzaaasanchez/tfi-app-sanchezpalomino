import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FuelingScreen } from './screens/FuelingScreen'

const Stack = createNativeStackNavigator()

const FuelingStack: FC = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="fuelingStack"
        component={FuelingScreen}
        options={{ headerTitle: 'Fueling' }}
      />
    </Stack.Navigator>
  )
}

export { FuelingStack }
