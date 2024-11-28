import { Color, LabelStyle, useI18n } from '@packages/common'
import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { PlaceType, ReservationModel } from '../../data/models/ReservationModel'

type ReservationCardProps = {
  reservation: ReservationModel
  onReservationSelected: () => void
}

type IconTextProps = {
  iconName: MaterialIconName
  text: string
}

type MaterialIconsName = keyof typeof MaterialIcons.glyphMap
type MaterialCommunityIconsName = keyof typeof MaterialCommunityIcons.glyphMap
type MaterialIconName = MaterialIconsName | MaterialCommunityIconsName

const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
  onReservationSelected,
}) => {
  const { t } = useI18n()

  const IconText: React.FC<IconTextProps> = ({ iconName, text }) => {
    let IconComponent: React.ReactNode = null

    if (iconName in MaterialCommunityIcons.glyphMap) {
      IconComponent = (
        <MaterialCommunityIcons
          name={iconName as keyof typeof MaterialCommunityIcons.glyphMap}
          size={16}
          color={Color.black[400]}
        />
      )
    } else if (iconName in MaterialIcons.glyphMap) {
      IconComponent = (
        <MaterialIcons
          name={iconName as keyof typeof MaterialIcons.glyphMap}
          size={16}
          color={Color.black[400]}
        />
      )
    } else {
      console.warn(`The icon "${iconName}" was not found.`)
      IconComponent = null
    }

    return (
      <View style={styles.row}>
        {IconComponent}
        <Text style={styles.date}>{text}</Text>
      </View>
    )
  }

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onReservationSelected}>
      <View style={styles.cardContainer}>
        <View style={styles.leftContainer}>
          <Image
            source={{ uri: reservation.userOwner?.avatar }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.userName}>{reservation.userOwner?.fullName}</Text>
          <IconText
            iconName={'calendar-today'}
            text={reservation.visitsRangeDate}
          />
          <IconText
            iconName={'pets'}
            text={`${reservation.pets?.length} ${reservation.pets?.length === 1 ? t('reservesScreen.card.pet') : t('reservesScreen.card.pets')}`}
          />
          <IconText
            iconName={'map-marker'}
            text={
              reservation.placeType === PlaceType.Home
                ? t('reserveDetailScreen.placeTypeHome')
                : reservation.pets?.length === 1
                  ? t('reserveDetailScreen.placeTypeVisit')
                  : t('reserveDetailScreen.placeTypeVisitPlural')
            }
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 12,
    elevation: 3,
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
    ...LabelStyle.body(600),
    color: Color.black[700],
  },
  date: {
    color: Color.black[400],
    marginLeft: 6,
  },
  address: {
    color: Color.black[400],
    marginLeft: 6,
    flexShrink: 1,
  },
  distance: {
    color: Color.black[300],
  },
})

export default ReservationCard
