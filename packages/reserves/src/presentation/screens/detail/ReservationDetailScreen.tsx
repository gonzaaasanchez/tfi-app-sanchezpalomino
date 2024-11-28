import {
  Color,
  LabelStyle,
  ShowToast,
  useI18n,
  PetModel,
  PPBottomSheetContainer,
  PPBottomSheet,
  useBottomSheetModalRef,
  Button,
} from '@packages/common'
import { FC, useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import {
  PlaceType,
  ReservationModel,
  ReservationStatus,
} from '../../../data/models/ReservationModel'
import { RouteProp, useRoute } from '@react-navigation/native'
import { DetailItem } from './DetailItem'
import { PetDetail } from './PetDetail'
import { useReserveDetailViewModel } from '../../viewModels/ReserveDetailViewModel'

type RootStackParamList = {
  reservationDetail: { reservation: ReservationModel }
}

type ReservationDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'reservationDetail'
>

const ReservationDetailScreen: FC = (): JSX.Element => {
  const {
    state,
    acceptReserve,
    rejectReserve,
    cancelReserveCarer,
    cancelReserveOwner,
  } = useReserveDetailViewModel()
  const { t } = useI18n()
  const route = useRoute<ReservationDetailScreenRouteProp>()
  const reservation = route.params.reservation
  const [petDetail, setPetDetail] = useState<PetModel>(null)
  const petDetailModalRef = useBottomSheetModalRef()

  useEffect(() => {
    if (state.error !== null) {
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: state.error,
      })
    }
  }, [state.error])

  useEffect(() => {
    if (petDetail) {
      petDetailModalRef.current?.present()
    }
  }, [petDetail])

  const ReceivedButtonsContainer: FC = () => {
    const primaryButtonTitle = 'Aceptar reserva'

    const secondaryButtonTitle = (() => {
      switch (reservation.status) {
        case ReservationStatus.Pending:
          return 'Rechazar reserva'
        case ReservationStatus.Started:
        case ReservationStatus.Confirmed:
          return 'Cancelar reserva'
        default:
          return ''
      }
    })()

    const primaryButtonNedded = (): boolean => {
      return reservation.status === ReservationStatus.Pending
    }

    const secondaryButtonNedded = (): boolean => {
      return (
        reservation.status === ReservationStatus.Pending ||
        reservation.status === ReservationStatus.Started ||
        reservation.status === ReservationStatus.Confirmed
      )
    }

    const primaryButtonTapped = (): void => {
      acceptReserve()
    }

    const secondaryButtonTapped = (): void => {
      switch (reservation.status) {
        case ReservationStatus.Pending:
          rejectReserve()
          break
        case ReservationStatus.Confirmed:
        case ReservationStatus.Started:
          cancelReserveCarer()
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

  return (
    <PPBottomSheetContainer>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.userContainer}>
            <Image
              source={{ uri: reservation.userOwner?.avatar }}
              style={styles.avatar}
            />
            <View>
              <Text style={LabelStyle.title2()}>
                {reservation.userOwner?.fullName}
              </Text>
              <Text style={LabelStyle.callout2()}>
                {reservation.userOwner?.phoneNumber}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('reserveDetailScreen.pets')}</Text>
          <View style={styles.detailContainer}>
            {reservation.pets?.map((pet) => (
              <View key={pet.id}>
                <DetailItem
                  icon="pets"
                  value={`${pet.name} (${pet.type.name})`}
                  onPress={() => setPetDetail(pet)}
                />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {t('reserveDetailScreen.details')}
          </Text>
          <View style={styles.detailContainer}>
            <DetailItem
              icon="home-filled"
              title={t('reserveDetailScreen.where')}
              value={
                reservation.placeType === PlaceType.Home
                  ? t('reserveDetailScreen.placeTypeHome')
                  : reservation.pets?.length === 1
                    ? t('reserveDetailScreen.placeTypeVisit')
                    : t('reserveDetailScreen.placeTypeVisitPlural')
              }
            />
            {reservation.placeType === PlaceType.Visit && (
              <DetailItem
                icon="map-marker"
                title={t('reserveDetailScreen.location')}
                value={`${reservation.location} (a ${reservation.distance} km)`}
              />
            )}
            <DetailItem
              icon="calendar-today"
              title={t('reserveDetailScreen.date')}
              value={reservation.visitsRangeDate}
            />
            {reservation.placeType === PlaceType.Visit && (
              <DetailItem
                icon="numbers"
                title={t('reserveDetailScreen.visitsPerDay')}
                value={reservation.visitsPerDay.toString()}
              />
            )}
          </View>
        </View>

        <ReceivedButtonsContainer />
      </View>
      <PPBottomSheet.Empty
        ref={petDetailModalRef}
        dismisseable={true}
        onDismiss={() => setPetDetail(null)}
      >
        <PetDetail pet={petDetail} />
      </PPBottomSheet.Empty>
    </PPBottomSheetContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Color.mainBackground,
  },
  /* Card */
  card: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    ...LabelStyle.body({ fontWeight: 500 }),
    marginBottom: 5,
  },
  detailContainer: {
    marginTop: 10,
    gap: 5,
  },
  /* User */
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
})

export { ReservationDetailScreen }
