import React, { FC, useEffect, useState } from 'react'
import {
  Color,
  LabelStyle,
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
  Loader,
  GenericToast,
  PPMaterialIcon,
  DateUtils,
} from '@packages/common'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { markStatusChanged } from '../../../domain/store/ReservesSlice'
import {
  PlaceType,
  ReservationModel,
  ReserveStatus,
} from '../../../data/models/ReservationModel'
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native'
import { useReserveDetailViewModel } from '../../viewModels/ReserveDetailViewModel'
import {
  CarerReservationActions,
  OwnerReservationActions,
} from './ReservationActionButtons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ReviewBottomSheetContent } from './ReviewBottomSheetContent'

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
  const route = useRoute<ReservationDetailScreenRouteProp>()
  const navigation = useNavigation()
  const reservation = route.params.reservation
  const isUserRequest = route.params.isUserRequest

  const {
    state,
    acceptReserve,
    rejectReserve,
    cancelReserveCarer,
    cancelReserveOwner,
    clearConfirmation,
    executeAction,
    saveReview,
    clearStatusMessage,
  } = useReserveDetailViewModel(reservation)
  const { t } = useI18n()
  const [petDetail, setPetDetail] = useState<PetModel>(null)
  const petDetailModalRef = useBottomSheetModalRef()
  const statusModalRef = useBottomSheetModalRef()
  const confirmationModalRef = useBottomSheetModalRef()
  const reviewModalRef = useBottomSheetModalRef()
  const baseUrl = useInjection(Types.BaseURL) as string
  const dispatch = useDispatch()

  useEffect(() => {
    if (petDetail) {
      petDetailModalRef.current?.present()
    }
  }, [petDetail])

  useEffect(() => {
    if (state.reserveStatusChangeTitle) {
      statusModalRef.current?.present()
    }
  }, [state.reserveStatusChangeTitle])

  useEffect(() => {
    if (state.confirmationDialog?.show) {
      confirmationModalRef.current?.present()
    }
  }, [state.confirmationDialog?.show])

  useEffect(() => {
    if (state.reviewSent) {
      reviewModalRef.current?.dismiss()
    }
  }, [state.reviewSent])

  const handleStatusDismiss = () => {
    clearStatusMessage()
    statusModalRef.current?.dismiss()
    navigation.goBack()
    dispatch(markStatusChanged())
  }

  const handleConfirmationAccept = () => {
    confirmationModalRef.current?.dismiss()
    clearConfirmation()
    executeAction()
  }

  const handleConfirmationCancel = () => {
    confirmationModalRef.current?.dismiss()
    clearConfirmation()
  }

  const handleReviewButtonPress = () => {
    reviewModalRef.current?.present()
  }

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
            <View style={styles.row}>
              <PPMaterialIcon icon="star" size={16} />
              <Text style={LabelStyle.callout2()}>
                {t('reserveDetailScreen.reviews', {
                  average: state.currentReserve?.placeDetailReviews({
                    isUserRequest,
                  })?.average,
                  total: state.currentReserve?.placeDetailReviews({
                    isUserRequest,
                  })?.total,
                })}
              </Text>
            </View>
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
    const getLocationValue = () => {
      const address = state.currentReserve?.address
      const distance = state.currentReserve?.distance?.toString() || '0'

      const mainAddress = t('reserveDetailScreen.distanceFormat', {
        location: address?.fullAddress || '',
        distance,
      })
      const secondaryAddress = address?.secondaryAddress(t) || ''

      return secondaryAddress
        ? `${mainAddress}\n${secondaryAddress}`
        : mainAddress
    }

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
            value={getLocationValue()}
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

  const ReviewsCard = () => {
    //
    const Comment = ({
      reviewType,
      name,
      date,
      rating,
      message,
    }: {
      reviewType: 'owner' | 'caregiver'
      name: string
      date: string
      rating: number
      message: string
    }) => {
      const stars = [1, 2, 3, 4, 5]

      return (
        <View>
          <Text style={{ paddingBottom: 8, ...LabelStyle.body2() }}>
            {(() => {
              const typeLabel =
                reviewType === 'owner'
                  ? t('reserveDetailScreen.reviewsSection.ownerLabel')
                  : t('reserveDetailScreen.reviewsSection.caregiverLabel')
              const formattedDate = DateUtils.DDMMYYYY(date)
              return `${name} (${typeLabel}) el ${formattedDate}:`
            })()}
          </Text>
          <View style={{ flexDirection: 'row', paddingBottom: 2 }}>
            {stars.map((star) => (
              <PPMaterialIcon
                key={star}
                icon={rating >= star ? 'star' : 'star-border'}
                size={12}
                color={rating >= star ? Color.brand1[600] : Color.brand1[400]}
              />
            ))}
          </View>
          <Text style={{ ...LabelStyle.callout2({ color: Color.black[500] }) }}>
            {message}
          </Text>
        </View>
      )
    }

    const NoReview = ({
      reviewType,
      onPress,
    }: {
      reviewType: 'owner' | 'caregiver'
      onPress: () => void
    }) => {
      return (
        <>
          <Text style={LabelStyle.callout2({ textAlign: 'center' })}>
            {reviewType === 'owner'
              ? isUserRequest
                ? t('reserveDetailScreen.reviewsSection.noReviewUser')
                : t('reserveDetailScreen.reviewsSection.noReviewOwner')
              : !isUserRequest
                ? t('reserveDetailScreen.reviewsSection.noReviewUser')
                : t('reserveDetailScreen.reviewsSection.noReviewCarer')}
          </Text>
          {isUserRequest && reviewType === 'owner' && (
            <ReviewButton onPress={onPress} />
          )}
          {!isUserRequest && reviewType === 'caregiver' && (
            <ReviewButton onPress={onPress} />
          )}
        </>
      )
    }

    const ReviewButton = ({ onPress }: { onPress: () => void }) => {
      return (
        <TouchableOpacity
          style={{ alignSelf: 'center', paddingTop: 10 }}
          onPress={onPress}
        >
          <Text style={styles.reviewButton}>
            {t('reserveDetailScreen.reviewsSection.createReview')}
          </Text>
        </TouchableOpacity>
      )
    }

    const MainContent = () => {
      return (
        <View style={{ marginVertical: 10 }}>
          {state.currentReserveReview?.summary.hasOwnerReview == true ? (
            <Comment
              reviewType="owner"
              name={state.currentReserveReview.reviews.owner.reviewer.firstName}
              date={state.currentReserveReview.reviews.owner.createdAt}
              message={state.currentReserveReview.reviews.owner.comment}
              rating={state.currentReserveReview.reviews.owner.rating}
            />
          ) : (
            <NoReview reviewType="owner" onPress={handleReviewButtonPress} />
          )}
          <View style={styles.reviewSeparator} />
          {state.currentReserveReview?.summary.hasCaregiverReview == true ? (
            <Comment
              reviewType="caregiver"
              name={
                state.currentReserveReview.reviews.caregiver.reviewer.firstName
              }
              date={state.currentReserveReview.reviews.caregiver.createdAt}
              message={state.currentReserveReview.reviews.caregiver.comment}
              rating={state.currentReserveReview.reviews.caregiver.rating}
            />
          ) : (
            <NoReview
              reviewType="caregiver"
              onPress={handleReviewButtonPress}
            />
          )}
        </View>
      )
    }

    return (
      <>
        {state.currentReserve.status === ReserveStatus.Finished && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              {t('reserveDetailScreen.reviewsSection.title')}
            </Text>
            <MainContent />
          </View>
        )}
      </>
    )
  }

  const ActionsCard = () => {
    const isFinished = state.currentReserve.status === ReserveStatus.Finished
    return (
      <>
        {!isFinished && (
          <View style={styles.actionsContainer}>
            {isUserRequest && (
              <OwnerReservationActions
                reservation={state.currentReserve}
                cancel={cancelReserveOwner}
              />
            )}
            {!isUserRequest && (
              <CarerReservationActions
                reservation={state.currentReserve}
                accept={acceptReserve}
                reject={rejectReserve}
                cancel={cancelReserveCarer}
              />
            )}
          </View>
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
      <SafeAreaView style={styles.mainContainer} edges={[]}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator
        >
          <UserCard />
          <PetsCard />
          <DetailsCard />
          <ReviewsCard />
          <PaymentInfoComponent
            isUserRequest={isUserRequest}
            totalPrice={state.currentReserve?.totalPrice}
            commission={state.currentReserve?.commission}
            totalOwner={state.currentReserve?.totalOwner}
            totalCaregiver={state.currentReserve?.totalCaregiver}
            needsShadow={true}
          />
        </ScrollView>
        <ActionsCard />
      </SafeAreaView>
      <PPBottomSheet.Empty
        ref={petDetailModalRef}
        dismisseable={true}
        onDismiss={() => setPetDetail(null)}
      >
        <PetDetail pet={petDetail} baseUrl={baseUrl} />
      </PPBottomSheet.Empty>

      <PPBottomSheet.Dialog
        ref={confirmationModalRef}
        title={state.confirmationDialog?.title}
        subtitle={state.confirmationDialog?.subtitle}
        onPrimaryAction={handleConfirmationAccept}
        onSecondaryAction={handleConfirmationCancel}
        primaryActionTitle={t('reserveDetailScreen.confirmation.accept')}
        secondaryActionTitle={t('reserveDetailScreen.confirmation.cancel')}
      />

      <PPBottomSheet.Dialog
        ref={statusModalRef}
        title={state.reserveStatusChangeTitle}
        subtitle={state.reserveStatusChangeSubtitle}
        onPrimaryAction={handleStatusDismiss}
      />

      <PPBottomSheet.Empty ref={reviewModalRef} dismisseable={true}>
        <ReviewBottomSheetContent onReviewSubmitted={saveReview} />
      </PPBottomSheet.Empty>

      {state.loading && <Loader loading={state.loading} />}
      <GenericToast overrideOffset={10} />
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
    paddingBottom: 40,
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
  reviewSeparator: {
    height: 1,
    backgroundColor: Color.black[300],
    marginVertical: 20,
    marginHorizontal: 10,
  },
  reviewButton: {
    ...LabelStyle.body2({ color: Color.brand1[700] }),
    borderBottomWidth: 1,
    borderBottomColor: Color.brand1[700],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
  },
})

export { ReservationDetailScreen }
