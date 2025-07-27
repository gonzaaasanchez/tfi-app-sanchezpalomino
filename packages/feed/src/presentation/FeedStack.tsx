import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FeedScreen } from './screens/FeedScreen'
import { GeneralStyle, useI18n } from '@packages/common'
import { useNavigation } from '@react-navigation/native'
import { FeedNewScreen } from './screens/FeedNewScreen'
import { FeedCommentsScreen } from './screens/FeedCommentsScreen'
import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

const Stack = createNativeStackNavigator()

const FeedStack: FC = (): JSX.Element => {
  const navigation = useNavigation()
  const { t } = useI18n()

  return (
    <Stack.Navigator
      id={navigation.getParent()}
      screenOptions={GeneralStyle.header}
    >
      <Stack.Screen
        name="feedStack"
        component={FeedScreen}
        options={{ headerTitle: t('tabbar.feed') }}
      />
      <Stack.Screen
        name="feedNew"
        component={FeedNewScreen}
        options={({ navigation }) => ({
          headerTitle: t('feedNewScreen.title'),
          presentation: 'fullScreenModal',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="feedComments"
        component={FeedCommentsScreen}
        options={({ navigation }) => ({
          headerTitle: t('feedCommentsScreen.title'),
          presentation: 'fullScreenModal',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  )
}

export { FeedStack }
