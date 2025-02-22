import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FeedScreen } from './screens/FeedScreen'
import { GeneralStyle } from '@packages/common'
import { useNavigation } from '@react-navigation/native'

const Stack = createNativeStackNavigator()

const FeedStack: FC = (): JSX.Element => {
  const navigation = useNavigation()
  return (
    <Stack.Navigator
      id={navigation.getParent()}
      screenOptions={GeneralStyle.header}
    >
      <Stack.Screen
        name="feedStack"
        component={FeedScreen}
        options={{ headerTitle: 'Feed' }}
      />
    </Stack.Navigator>
  )
}

export { FeedStack }
