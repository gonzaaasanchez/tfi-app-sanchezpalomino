import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MoreScreen } from './screens/MoreScreen'
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { ProfileScreen } from './screens/ProfileScreen'
import { PetsScreen } from './screens/PetsScreen'
import { GeneralStyle, useI18n } from '@packages/common'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { PetsNewScreen } from './screens/PetsNewScreen'
import { CarerPreferencesScreen } from './screens/CarerPreferencesScreen'
import { AddressesScreen } from './screens/AddressesScreen'
import { AddressNewScreen } from './screens/AddressNewScreen'

const Stack = createNativeStackNavigator()

const MoreStack: FC = (): JSX.Element => {
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
          headerTitle: t('profileScreen.title'),
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
          headerTitle: t('petsScreen.title'),
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
          headerTitle: t('petsNewScreen.title'),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="carerPreferences"
        component={CarerPreferencesScreen}
        options={({ navigation }) => ({
          headerTitle: t('carerPreferencesScreen.title'),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="addresses"
        component={AddressesScreen}
        options={({ navigation }) => ({
          headerTitle: t('addressesScreen.title'),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="addressNew"
        component={AddressNewScreen}
        options={({ navigation }) => ({
          headerTitle: t('addressNewScreen.title'),
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
