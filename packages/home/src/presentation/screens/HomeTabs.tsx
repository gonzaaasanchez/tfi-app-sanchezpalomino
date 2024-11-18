import React, { FC } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator()

type Props = {
  feed?: FC
  reserves?: FC
  services?: FC
  loads?: FC
  more?: FC
}

const HomeTabs: FC<Props> = ({
  feed,
  reserves,
  services,
  loads,
  more,
}): JSX.Element => {
  return (
    <Tab.Navigator>
      {feed && (
        <Tab.Screen
          name="feed"
          component={feed}
          options={{
            headerShown: false,
            tabBarLabel: 'Feed',
            tabBarIcon: ({ color }) => {
              return <MaterialIcons name="home" size={24} color={color} />
            },
          }}
        />
      )}
      {reserves && (
        <Tab.Screen
          name="reserves"
          component={reserves}
          options={{
            headerShown: false,
            tabBarLabel: 'Reservas',
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
      {services && (
        <Tab.Screen
          name="services"
          component={services}
          options={{
            headerShown: false,
            tabBarLabel: 'Servicios',
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
