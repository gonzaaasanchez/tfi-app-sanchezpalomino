import {
  Color,
  GeneralStyle,
  LabelStyle,
  PPMaterialIcon,
  PPMaterialIconsName,
  useI18n,
} from '@packages/common'
import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { PlaceType, ReservationModel } from '../../data/models/ReservationModel'

type ReservationCardProps = {
  reservation: ReservationModel
  onReservationSelected: () => void
}

type IconTextProps = {
  iconName: PPMaterialIconsName
  text: string
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
  onReservationSelected,
}) => {
  const { t } = useI18n()

  const IconText: React.FC<IconTextProps> = ({ iconName, text }) => {
    return (
      <View style={styles.row}>
        <View style={{ marginTop: 1 }}>
          <PPMaterialIcon icon={iconName} size={16} />
        </View>
        <Text style={styles.detail}>{text}</Text>
      </View>
    )
  }

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onReservationSelected}>
      <View style={styles.cardContainer}>
        <View style={styles.leftContainer}>
          <Image
            source={{ uri: reservation.placeDetailAvatar }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.userName}>{reservation.placeDetailUsername}</Text>
          <IconText
            iconName={'calendar-today'}
            text={reservation.visitsRangeDate}
          />
          <IconText
            iconName={'pets'}
            text={`${reservation.pets?.length} ${reservation.pets?.length === 1 ? t('reservesScreen.card.pet') : t('reservesScreen.card.pets')}`}
          />
          <IconText
            iconName={'home-filled'}
            text={t(reservation.placeDetailText)}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    ...GeneralStyle.card,
    flexDirection: 'row',
  },
  leftContainer: {
    marginRight: 12,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 5,
  },
  userName: {
    ...LabelStyle.body({ fontWeight: 600, color: Color.black[700] }),
  },
  detail: {
    ...LabelStyle.callout2({ color: Color.black[500] }),
    marginLeft: 6,
    flexShrink: 1,
  },
})

export default ReservationCard
