import { Button, useI18n } from '@packages/common'
import {
  ReservationModel,
  ReservationStatus,
} from '@packages/reserves/src/data/models/ReservationModel'
import { FC } from 'react'
import { View } from 'react-native'

type CarerReservationActionsProps = {
  reservation?: ReservationModel
  accept: () => void
  reject: () => void
  cancel: () => void
}

type OwnerReservationActionsProps = {
  cancel: () => void
}

const CarerReservationActions: FC<CarerReservationActionsProps> = ({
  reservation,
  accept,
  reject,
  cancel,
}) => {
  const { t } = useI18n()

  const primaryButtonTitle = t('reserveDetailScreen.acceptReserve')
  const secondaryButtonTitle =
    {
      [ReservationStatus.Pending]: t('reserveDetailScreen.rejectReserve'),
      [ReservationStatus.Started]: t('reserveDetailScreen.cancelReserve'),
      [ReservationStatus.Confirmed]: t('reserveDetailScreen.cancelReserve'),
    }[reservation.status] || ''

  const primaryButtonNedded = (): boolean => {
    return reservation.status === ReservationStatus.Pending
  }

  const secondaryButtonNedded = (): boolean => {
    return (
      reservation?.status === ReservationStatus.Pending ||
      reservation?.status === ReservationStatus.Started ||
      reservation?.status === ReservationStatus.Confirmed
    )
  }

  const primaryButtonTapped = (): void => {
    accept()
  }

  const secondaryButtonTapped = (): void => {
    switch (reservation?.status) {
      case ReservationStatus.Pending:
        reject()
        break
      case ReservationStatus.Confirmed:
      case ReservationStatus.Started:
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
  cancel,
}) => {
  const { t } = useI18n()

  return (
    <View>
      <Button.Secondary
        title={t('reserveDetailScreen.cancelReserve')}
        onPress={cancel}
      />
    </View>
  )
}

export { CarerReservationActions, OwnerReservationActions }
