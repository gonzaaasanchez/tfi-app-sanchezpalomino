import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DetailScreen } from './screens/DetailScreen'
import { useNavigation } from '@react-navigation/native'

const Stack = createNativeStackNavigator()

const DetailStack: FC = (): JSX.Element => {
  const navigation = useNavigation()
  return (
    <Stack.Navigator id={navigation.getParent()}>
      <Stack.Screen
        name="detail"
        component={DetailScreen}
        options={{ headerTitle: 'Detail' }}
      />
    </Stack.Navigator>
  )
}

export { DetailStack }
