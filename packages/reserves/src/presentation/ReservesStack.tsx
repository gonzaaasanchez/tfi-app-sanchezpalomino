import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ReservesScreen } from './screens/ReservesScreen'
import { GeneralStyle, useI18n } from '@packages/common'
import { ReservationDetailScreen } from './screens/detail/ReservationDetailScreen'
import { ReservationModel } from '../data/models/ReservationModel'
import { useNavigation } from '@react-navigation/native'
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native'

type ReservesStackParamList = {
  reservesStack: undefined
  reservationDetail: { reservation: ReservationModel }
}

const Stack = createNativeStackNavigator<ReservesStackParamList>()

const ReservesStack: FC = (): JSX.Element => {
  const { t } = useI18n()
  return (
    <Stack.Navigator screenOptions={GeneralStyle.header}>
      <Stack.Screen
        name="reservesStack"
        component={ReservesScreen}
        options={{
          headerTitle: t('reservesScreen.title'),
        }}
      />
      <Stack.Screen
        name="reservationDetail"
        component={ReservationDetailScreen}
        options={{
          headerTitle: t('reserveDetailScreen.title'),
          presentation: 'modal',
          headerRight: () => {
            const navigation = useNavigation()
            return (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcons name="close" size={24} color="white" />
              </TouchableOpacity>
            )
          },
        }}
      />
    </Stack.Navigator>
  )
}

export { ReservesStack }
