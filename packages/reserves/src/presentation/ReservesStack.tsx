import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ReservesScreen } from './screens/ReservesScreen'
import { GeneralStyle, useI18n } from '@packages/common'
import { ReservationDetailScreen } from './screens/detail/ReservationDetailScreen'
import { ReservationModel } from '../data/models/ReservationModel'
import { useNavigation } from '@react-navigation/native'
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native'
import { ReservationNewStepsStack } from './screens/new/ReservationNewStepsStack'

type ReservesStackParamList = {
  reservesStack: undefined
  reservationDetail: { reservation: ReservationModel }
  reservationNewSteps: undefined
}

const Stack = createNativeStackNavigator<ReservesStackParamList>()

const ReservesStack: FC = (): JSX.Element => {
  const { t } = useI18n()
  const navigation = useNavigation()
  return (
    <Stack.Navigator
      id={navigation.getParent()}
      screenOptions={GeneralStyle.header}
    >
      <Stack.Screen
        name="reservesStack"
        component={ReservesScreen}
        options={{ headerTitle: t('reservesScreen.title') }}
      />
      <Stack.Screen
        name="reservationDetail"
        component={ReservationDetailScreen}
        options={({ navigation }) => ({
          headerTitle: t('reserveDetailScreen.title'),
          presentation: 'fullScreenModal',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="reservationNewSteps"
        component={ReservationNewStepsStack}
        options={({ navigation }) => ({
          headerShown: false,
          presentation: 'fullScreenModal',
        })}
      />
    </Stack.Navigator>
  )
}

export { ReservesStack, ReservesStackParamList }
