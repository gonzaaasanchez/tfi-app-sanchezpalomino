import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FeedScreen } from './screens/FeedScreen'

const Stack = createNativeStackNavigator()

const FeedStack: FC = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="feedStack"
        component={FeedScreen}
        options={{ headerTitle: 'Feed' }}
      />
    </Stack.Navigator>
  )
}

export { FeedStack }
