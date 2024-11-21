import { Color, LabelStyle } from '@packages/common'
import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

type ReservationCardProps = {
  imageUrl: string
  firstName: string
  lastName: string
  date: string
  address: string
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  imageUrl,
  firstName,
  lastName,
  date,
  address,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.leftContainer}>
        <Image source={{ uri: imageUrl }} style={styles.profileImage} />
      </View>

      <View style={styles.rightContainer}>
        <Text style={[LabelStyle.body, styles.name]}>
          {firstName} {lastName}
        </Text>
        <Text style={[LabelStyle.body, styles.date]}>{date}</Text>
        <Text style={[LabelStyle.body, styles.address]}>{address}</Text>
      </View>
    </View>
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
    shadowOpacity: 0.1,
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
  name: {
    fontWeight: 'bold',
    color: Color.black[700],
  },
  date: {
    color: Color.black[500],
    marginTop: 4,
  },
  address: {
    color: Color.black[400],
    marginTop: 4,
  },
})

export default ReservationCard
