import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MoreScreen } from './screens/MoreScreen'
import { useMoreViewModel } from './viewModels/MoreViewModel'
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { ProfileScreen } from './screens/ProfileScreen'
import { GeneralStyle } from '@packages/common'

const Stack = createNativeStackNavigator()

const MoreStack: FC = (): JSX.Element => {
  const { logout } = useMoreViewModel()
  return (
    <Stack.Navigator screenOptions={GeneralStyle.header}>
      <Stack.Screen
        name="moreStack"
        component={MoreScreen}
        options={{
          headerTitle: 'More',
        }}
      />
      <Stack.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          headerTitle: 'Profile',
          headerRight: () => (
            <MaterialIcons
              name="logout-variant"
              color="black"
              size={24}
              onPress={logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  )
}

export { MoreStack }
