import {
  Color,
  LabelStyle,
  ShowToast,
  useI18n,
  PetModel,
  PPBottomSheetContainer,
  PPBottomSheet,
  useBottomSheetModalRef,
  GeneralStyle,
} from '@packages/common'
import { FC, useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import {
  PlaceType,
  ReservationModel,
} from '../../../data/models/ReservationModel'
import { RouteProp, useRoute } from '@react-navigation/native'
import { DetailItem } from './DetailItem'
import { PetDetail } from './PetDetail'
import { useReserveDetailViewModel } from '../../viewModels/ReserveDetailViewModel'
import {
  CarerReservationActions,
  OwnerReservationActions,
} from './ReservationActionButtons'

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
    setCurrentReserve,
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
    setCurrentReserve(reservation)
  }, [])

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

  return (
    <PPBottomSheetContainer>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.userContainer}>
            <Image
              source={{ uri: state.currentReserve?.placeDetailAvatar }}
              style={styles.avatar}
            />
            <View>
              <Text style={LabelStyle.title2()}>
                {state.currentReserve?.placeDetailUsername}
              </Text>
              <Text style={LabelStyle.callout2()}>
                {state.currentReserve?.placeDetailPhoneNumber}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('reserveDetailScreen.pets')}</Text>
          <View style={styles.detailContainer}>
            {state.currentReserve?.pets?.map((pet) => (
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
              value={t(state.currentReserve?.placeDetailText)}
            />
            {state.currentReserve?.placeType === PlaceType.Visit && (
              <DetailItem
                icon="map-marker"
                title={t('reserveDetailScreen.location')}
                value={t('reserveDetailScreen.distanceFormat', {
                  location: state.currentReserve?.location,
                  distance: state.currentReserve?.distance.toString()
                })}
              />
            )}
            <DetailItem
              icon="calendar-today"
              title={t('reserveDetailScreen.date')}
              value={state.currentReserve?.visitsRangeDate}
            />
            {state.currentReserve?.placeType === PlaceType.Visit && (
              <DetailItem
                icon="numbers"
                title={t('reserveDetailScreen.visitsPerDay')}
                value={state.currentReserve?.visitsPerDay.toString()}
              />
            )}
          </View>
        </View>

        {state.currentReserve?.createdByUser && (
          <OwnerReservationActions cancel={cancelReserveOwner} />
        )}

        {state.currentReserve?.createdForUser && (
          <CarerReservationActions
            reservation={state.currentReserve}
            accept={acceptReserve}
            reject={rejectReserve}
            cancel={cancelReserveCarer}
          />
        )}
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
    ...GeneralStyle.card,
    marginBottom: 16,
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
