import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MoreScreen } from './screens/MoreScreen'
import { useMoreViewModel } from './viewModels/MoreViewModel'
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { ProfileScreen } from './screens/ProfileScreen'
import { PetsScreen } from './screens/PetsScreen'
import { GeneralStyle, useI18n } from '@packages/common'
import { useNavigation, StackActions } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { PetsNewScreen } from './screens/PetsNewScreen'

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
      <Stack.Screen
        name="pets"
        component={PetsScreen}
        options={({ navigation }) => ({
          headerTitle: t('moreScreen.menu.pets'),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="petsNew"
        component={PetsNewScreen}
        options={({ navigation }) => ({
          headerTitle: t('moreScreen.menu.petsNew'),
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
