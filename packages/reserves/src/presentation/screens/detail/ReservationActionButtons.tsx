import { Button, useI18n } from '@packages/common'
import { FC } from 'react'
import { View } from 'react-native'
import {
  ReservationModel,
  ReserveStatus,
} from '../../../data/models/ReservationModel'

type CarerReservationActionsProps = {
  reservation: ReservationModel
  accept: () => void
  reject: () => void
  cancel: () => void
}

type OwnerReservationActionsProps = {
  reservation: ReservationModel
  cancel: () => void
}

const CarerReservationActions: FC<CarerReservationActionsProps> = ({
  reservation,
  accept,
  reject,
  cancel,
}) => {
  const { t } = useI18n()

  if (!reservation) {
    return null
  }

  const primaryButtonTitle = t('reserveDetailScreen.acceptReserve')
  const secondaryButtonTitle =
    {
      [ReserveStatus.WaitingAcceptance]: t('reserveDetailScreen.rejectReserve'),
      [ReserveStatus.Started]: t('reserveDetailScreen.cancelReserve'),
      [ReserveStatus.Confirmed]: t('reserveDetailScreen.cancelReserve'),
    }[reservation.status] || ''

  const primaryButtonNedded = (): boolean => {
    return reservation.status === ReserveStatus.WaitingAcceptance
  }

  const secondaryButtonNedded = (): boolean => {
    return (
      reservation?.status === ReserveStatus.WaitingAcceptance ||
      reservation?.status === ReserveStatus.Confirmed ||
      reservation?.status === ReserveStatus.Started
    )
  }

  const primaryButtonTapped = (): void => {
    accept()
  }

  const secondaryButtonTapped = (): void => {
    switch (reservation?.status) {
      case ReserveStatus.WaitingAcceptance:
        reject()
        break
      case ReserveStatus.Confirmed:
      case ReserveStatus.Started:
        cancel()
        break
    }
  }

  return (
    <View>
      {primaryButtonNedded() && (
        <Button.Primary
          title={primaryButtonTitle}
          onPress={primaryButtonTapped}
        />
      )}
      {secondaryButtonNedded() && (
        <Button.Secondary
          title={secondaryButtonTitle}
          onPress={secondaryButtonTapped}
        />
      )}
    </View>
  )
}

const OwnerReservationActions: FC<OwnerReservationActionsProps> = ({
  reservation,
  cancel,
}) => {
  const { t } = useI18n()

  const primaryButtonNedded = (): boolean => {
    return (
      reservation?.status === ReserveStatus.WaitingAcceptance ||
      reservation?.status === ReserveStatus.Confirmed ||
      reservation?.status === ReserveStatus.Started
    )
  }

  return (
    <View>
      {primaryButtonNedded() && (
        <Button.Secondary
          title={t('reserveDetailScreen.cancelReserve')}
          onPress={cancel}
        />
      )}
    </View>
  )
}

export { CarerReservationActions, OwnerReservationActions }
