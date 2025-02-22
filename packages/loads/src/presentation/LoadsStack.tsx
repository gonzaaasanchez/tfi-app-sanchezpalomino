import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoadsScreen } from './screens/LoadsScreen'
import { GeneralStyle } from '@packages/common'
import { useNavigation } from '@react-navigation/native'

const Stack = createNativeStackNavigator()

const LoadsStack: FC = (): JSX.Element => {
  const navigation = useNavigation()
  return (
    <Stack.Navigator
      id={navigation.getParent()}
      screenOptions={GeneralStyle.header}
    >
      <Stack.Screen
        name="loadsStack"
        component={LoadsScreen}
        options={{ headerTitle: 'Loads' }}
      />
    </Stack.Navigator>
  )
}

export { LoadsStack }
