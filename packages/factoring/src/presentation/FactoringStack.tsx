import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FactoringScreen } from './screens/FactoringScreen'

const Stack = createNativeStackNavigator()

const FactoringStack: FC = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="factoringStack"
        component={FactoringScreen}
        options={{ headerTitle: 'Factoring' }}
      />
    </Stack.Navigator>
  )
}

export { FactoringStack }
