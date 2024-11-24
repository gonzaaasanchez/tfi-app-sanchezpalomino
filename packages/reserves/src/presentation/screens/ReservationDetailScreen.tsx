import { ShowToast, useI18n } from '@packages/common'
import { FC, useEffect, useRef, useState } from 'react'
import { useReservesViewModel } from '../viewModels/ReservesViewModel'
import { View, Text } from 'react-native'
import { ReservationModel } from '../../data/models/ReservationModel'
import { RouteProp, useRoute } from '@react-navigation/native'

type RootStackParamList = {
  reservationDetail: { reservation: ReservationModel }
}

type ReservationDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'reservationDetail'
>

const ReservationDetailScreen: FC = (): JSX.Element => {
  const { state, setReserveType, setReserveStatus, getReserves } =
    useReservesViewModel()
  const { t } = useI18n()

  const route = useRoute<ReservationDetailScreenRouteProp>()
  const reservation = route.params.reservation

  useEffect(() => {
    if (state.error !== null) {
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: state.error,
      })
    }
  }, [state.error])

  return (
    <View style={{ flex: 1 }}>
      <Text>{reservation?.userOwner?.fullName}</Text>
    </View>
  )
}

export { ReservationDetailScreen }
