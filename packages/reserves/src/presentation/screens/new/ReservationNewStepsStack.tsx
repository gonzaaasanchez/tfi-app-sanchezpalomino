import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ReservationNewScreen } from './ReservationNewScreen'
import { ReservationResultsScreen } from './ReservationResultsScreen'
import { GeneralStyle, useI18n } from '@packages/common'
import { TouchableOpacity } from 'react-native'
import { useNavigation, CommonActions } from '@react-navigation/native'
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { SearchCriteria } from '../../../data/models/SearchCriteria'

type ReservationNewStepsStackParamList = {
  reservationNew: undefined
  reservationResults: {
    searchCriteria: SearchCriteria
  }
}

const Stack = createNativeStackNavigator<ReservationNewStepsStackParamList>()

const ReservationNewStepsStack: FC = (): JSX.Element => {
  const { t } = useI18n()
  const navigation = useNavigation()

  return (
    <Stack.Navigator
      id={navigation.getParent()}
      screenOptions={GeneralStyle.header}
    >
      <Stack.Screen
        name="reservationNew"
        component={ReservationNewScreen}
        options={{
          headerTitle: t('reserveNewScreen.title'),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="reservationResults"
        component={ReservationResultsScreen}
        options={({ navigation: stackNavigation }) => ({
          headerTitle: t('reserveResultsScreen.title'),
          headerLeft: () => (
            <TouchableOpacity onPress={() => stackNavigation.goBack()}>
              <MaterialIcons name="chevron-left" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  )
}

export { ReservationNewStepsStack, ReservationNewStepsStackParamList }
