import React, { FC } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator()

type Props = {
  dashboard?: FC
  factoring?: FC
  fueling?: FC
  loads?: FC
  more?: FC
}

const HomeTabs: FC<Props> = ({
  dashboard,
  factoring,
  fueling,
  loads,
  more,
}): JSX.Element => {
  return (
    <Tab.Navigator>
      {dashboard && (
        <Tab.Screen
          name="dashboard"
          component={dashboard}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => {
              return <MaterialIcons name="home" size={24} color={color} />
            },
          }}
        />
      )}
      {factoring && (
        <Tab.Screen
          name="factoring"
          component={factoring}
          options={{
            headerShown: false,
            tabBarLabel: 'Factoring',
            tabBarIcon: ({ color }) => {
              return (
                <MaterialIcons
                  name="package-variant-closed"
                  size={24}
                  color={color}
                />
              )
            },
          }}
        />
      )}
      {fueling && (
        <Tab.Screen
          name="fueling"
          component={fueling}
          options={{
            headerShown: false,
            tabBarLabel: 'Fueling',
            tabBarIcon: ({ color }) => {
              return <MaterialIcons name="fuel" size={24} color={color} />
            },
          }}
        />
      )}
      {loads && (
        <Tab.Screen
          name="loads"
          component={loads}
          options={{
            headerShown: false,
            tabBarLabel: 'Loads',
            tabBarIcon: ({ color }) => {
              return (
                <MaterialIcons
                  name="ticket-confirmation-outline"
                  size={24}
                  color={color}
                />
              )
            },
          }}
        />
      )}
      {more && (
        <Tab.Screen
          name="more"
          component={more}
          options={{
            headerShown: false,
            tabBarLabel: 'More',
            tabBarIcon: ({ color }) => {
              return (
                <MaterialIcons
                  name="dots-horizontal-circle-outline"
                  size={24}
                  color={color}
                />
              )
            },
          }}
        />
      )}
    </Tab.Navigator>
  )
}

export { HomeTabs }
