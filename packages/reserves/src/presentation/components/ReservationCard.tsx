import { Color, LabelStyle } from '@packages/common'
import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { ReservationModel } from '../../data/models/ReservationModel'

type ReservationCardProps = {
  reservation: ReservationModel
  onReservationSelected: () => void
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
  onReservationSelected,
}) => {
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
          <Text style={{ ...LabelStyle.body(600), color: Color.black[700] }}>
            {reservation.userOwner?.fullName}
          </Text>

          <View style={styles.row}>
            <MaterialIcons
              style={{ marginTop: 2 }}
              name="calendar-today"
              size={16}
              color={Color.black[400]}
            />
            <Text style={{ ...LabelStyle.body2(), ...styles.date }}>
              {reservation.visitsRangeDate}
            </Text>
          </View>

          <View style={styles.row}>
            <MaterialIcons
              style={{ marginTop: 2 }}
              name="map-marker"
              size={16}
              color={Color.black[400]}
            />
            <Text style={{ ...LabelStyle.body2(), ...styles.address }}>
              {reservation.location}
              <Text style={styles.distance}>
                {' (a ' + reservation.distance + ' km)'}
              </Text>
            </Text>
          </View>
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
    shadowColor: Color.black[300],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
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
