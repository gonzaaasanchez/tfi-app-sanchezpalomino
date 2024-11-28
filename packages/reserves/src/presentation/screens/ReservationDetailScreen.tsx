import {
  Color,
  LabelStyle,
  ShowToast,
  useI18n,
  PetModel,
  PPBottomSheetContainer,
  PPBottomSheet,
  useBottomSheetModalRef,
  PPMaterialIcon,
  PPMaterialIconsName,
} from '@packages/common'
import { FC, useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useReservesViewModel } from '../viewModels/ReservesViewModel'
import { PlaceType, ReservationModel } from '../../data/models/ReservationModel'
import { RouteProp, useRoute } from '@react-navigation/native'

type RootStackParamList = {
  reservationDetail: { reservation: ReservationModel }
}

type ReservationDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'reservationDetail'
>

const ReservationDetailScreen: FC = (): JSX.Element => {
  const { state } = useReservesViewModel()
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

  const DetailItem: React.FC<{
    icon: PPMaterialIconsName
    iconSize?: number
    iconTopPadding?: number
    title?: string
    value: string
    onPress?: () => void
  }> = ({
    iconSize = 15,
    iconTopPadding: neededIconPadding = 1,
    icon,
    title = null,
    value,
    onPress = null,
  }) => {
    return (
      <TouchableOpacity
        activeOpacity={onPress ? 0.6 : 1}
        onPress={onPress || undefined}
      >
        <View style={styles.detailContainerItem}>
          <View style={{ marginTop: neededIconPadding }}>
            <PPMaterialIcon icon={icon} size={iconSize} />
          </View>
          <View style={styles.detailContainerTitleSubtitle}>
            {title && (
              <Text style={styles.detailContainerTitleText}>{title}</Text>
            )}
            <Text
              style={{
                ...styles.detailContainerValueText,
                ...(title && { paddingLeft: 0 }),
              }}
            >
              {value}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const PetDetailSheet: FC = () => {
    return (
      <View style={{paddingBottom: 20}}>
        <Image style={styles.petImage} source={{ uri: petDetail?.photoUrl }} />
        <Text style={styles.petName}>{petDetail?.name}</Text>
        <Text style={styles.petType}>{`(${petDetail?.type.name})`}</Text>
        <Text style={styles.petComment}>{petDetail?.comment}</Text>
        <Text style={styles.petCharacteristicsTitle}>
          {t('reserveDetailScreen.petDetails')}
        </Text>
        {petDetail.characteristics?.map((characteristic) => (
          <View key={characteristic.id}>
            <DetailItem
              icon="pets"
              iconSize={14}
              iconTopPadding={2}
              title={`${characteristic.name}: `}
              value={`${characteristic.value}`}
            />
          </View>
        ))}
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
      </View>
      <PPBottomSheet.Empty
        ref={petDetailModalRef}
        dismisseable={true}
        onDismiss={() => setPetDetail(null)}
      >
        <PetDetailSheet />
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
  detailContainerItem: {
    flexDirection: 'row',
  },
  detailContainerTitleSubtitle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingRight: 20,
  },
  detailContainerTitleText: {
    ...LabelStyle.body2({ fontWeight: 500, color: Color.black[700] }),
    paddingLeft: 5,
    flexShrink: 0,
  },
  detailContainerValueText: {
    ...LabelStyle.callout2({ color: Color.black[500] }),
    paddingLeft: 5,
    flexShrink: 1,
    flexGrow: 1,
    minWidth: 0,
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
  /* Pet sheet detail */
  petImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
  },
  petName: {
    ...LabelStyle.title1(),
    textAlign: 'center',
  },
  petType: {
    ...LabelStyle.callout2(),
    textAlign: 'center',
    color: Color.black[500],
  },
  petComment: {
    ...LabelStyle.callout2({ fontWeight: 200 }),
    paddingVertical: 20,
    color: Color.black[800],
  },
  petCharacteristicsTitle: {
    ...LabelStyle.body({ textAlign: 'center' }),
    paddingBottom: 10,
    color: Color.black[800],
  },
})

export { ReservationDetailScreen }