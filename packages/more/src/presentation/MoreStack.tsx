import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MoreScreen } from './screens/MoreScreen'
import { useMoreViewModel } from './viewModels/MoreViewModel'
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { ProfileScreen } from './screens/ProfileScreen'
import { GeneralStyle, useI18n } from '@packages/common'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'

const Stack = createNativeStackNavigator()

const MoreStack: FC = (): JSX.Element => {
  const { logout } = useMoreViewModel()
  const navigation = useNavigation()
  const { t } = useI18n()

  return (
    <Stack.Navigator
      id={navigation.getParent()}
      screenOptions={{
        presentation: 'fullScreenModal',
        ...GeneralStyle.header,
      }}
    >
      <Stack.Screen
        name="moreStack"
        component={MoreScreen}
        options={{ headerTitle: t('moreScreen.title') }}
      />
      <Stack.Screen
        name="profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerTitle: t('moreScreen.menu.profile'),
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

export { MoreStack }
