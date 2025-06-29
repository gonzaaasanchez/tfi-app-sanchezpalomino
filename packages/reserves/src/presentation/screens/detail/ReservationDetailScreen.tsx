import React, { FC, useEffect, useState } from 'react'
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
  PetDetail,
  DetailItem,
  ImageWithPlaceholder,
  useInjection,
  Types,
  PaymentInfoComponent,
  getImageFullUrl,
} from '@packages/common'
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import {
  PlaceType,
  ReservationModel,
} from '../../../data/models/ReservationModel'
import { RouteProp, useRoute } from '@react-navigation/native'
import { useReserveDetailViewModel } from '../../viewModels/ReserveDetailViewModel'
import {
  CarerReservationActions,
  OwnerReservationActions,
} from './ReservationActionButtons'

type RootStackParamList = {
  reservationDetail: {
    reservation: ReservationModel
    isUserRequest: boolean
  }
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
  const isUserRequest = route.params.isUserRequest
  const [petDetail, setPetDetail] = useState<PetModel>(null)
  const petDetailModalRef = useBottomSheetModalRef()
  const baseUrl = useInjection(Types.BaseURL) as string

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

  const UserCard = () => {
    return (
      <View style={styles.card}>
        <View style={styles.userContainer}>
          <ImageWithPlaceholder
            source={getImageFullUrl(
              state.currentReserve?.placeDetailAvatar({ isUserRequest }),
              baseUrl
            )}
            dimension={70}
          />
          <View>
            <Text style={LabelStyle.title2()}>
              {state.currentReserve?.placeDetailUsername({ isUserRequest })}
            </Text>
            <Text style={LabelStyle.callout2()}>
              {state.currentReserve?.placeDetailPhone({ isUserRequest })}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  const PetsCard = () => {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('reserveDetailScreen.pets')}</Text>
        <View style={styles.detailContainer}>
          {state.currentReserve?.pets?.map((pet) => (
            <View key={pet.id}>
              <DetailItem
                icon="pets"
                value={`${pet.name} (${pet.petType?.name})`}
                onPress={() => setPetDetail(pet)}
              />
            </View>
          ))}
        </View>
      </View>
    )
  }

  const DetailsCard = () => {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('reserveDetailScreen.details')}</Text>
        <View style={styles.detailContainer}>
          <DetailItem
            icon="home-filled"
            title={t('reserveDetailScreen.where')}
            value={t(
              state.currentReserve?.placeDetailText?.({ isUserRequest, t }) ||
                ''
            )}
          />
          <DetailItem
            icon="map-marker"
            title={t('reserveDetailScreen.location')}
            value={t('reserveDetailScreen.distanceFormat', {
              location: state.currentReserve?.address?.fullAddress || '',
              distance: state.currentReserve?.distance?.toString() || '0',
            })}
          />
          <DetailItem
            icon="calendar-today"
            title={t('reserveDetailScreen.date')}
            value={state.currentReserve?.visitsRangeDate || ''}
          />
          {state.currentReserve?.careLocation === PlaceType.OwnerHome && (
            <DetailItem
              icon="numbers"
              title={t('reserveDetailScreen.visitsPerDay')}
              value={state.currentReserve?.visitsCount?.toString() || '0'}
            />
          )}
        </View>
      </View>
    )
  }

  const ActionsCard = () => {
    return (
      <>
        {isUserRequest && (
          <OwnerReservationActions cancel={cancelReserveOwner} />
        )}

        {!isUserRequest && (
          <CarerReservationActions
            reservation={state.currentReserve}
            accept={acceptReserve}
            reject={rejectReserve}
            cancel={cancelReserveCarer}
          />
        )}
      </>
    )
  }

  // Show loading or return null if reservation is not loaded yet
  if (!state.currentReserve) {
    return (
      <View style={styles.container}>
        <Text>{t('general.loading')}</Text>
      </View>
    )
  }

  return (
    <PPBottomSheetContainer>
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator
        >
          <UserCard />
          <PetsCard />
          <DetailsCard />
          <PaymentInfoComponent
            isUserRequest={isUserRequest}
            totalPrice={state.currentReserve?.totalPrice}
            commission={state.currentReserve?.commission}
            totalOwner={state.currentReserve?.totalOwner}
            totalCaregiver={state.currentReserve?.totalCaregiver}
            needsShadow={true}
          />
        </ScrollView>
        <View style={styles.actionsContainer}>
          <ActionsCard />
        </View>
      </SafeAreaView>
      <PPBottomSheet.Empty
        ref={petDetailModalRef}
        dismisseable={true}
        onDismiss={() => setPetDetail(null)}
      >
        <PetDetail pet={petDetail} baseUrl={baseUrl} />
      </PPBottomSheet.Empty>
    </PPBottomSheetContainer>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.mainBackground,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Color.mainBackground,
  },
  actionsContainer: {
    paddingHorizontal: 50,
    paddingTop: 7,
    borderTopWidth: 1,
    borderTopColor: Color.brand2[200],
  },
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
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
})

export { ReservationDetailScreen }
