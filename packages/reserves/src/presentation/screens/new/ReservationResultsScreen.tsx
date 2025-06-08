import React, { FC, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { Color, LabelStyle, PPMaterialIcon, Loader } from '@packages/common'
import { useReservationResultsViewModel } from '../../viewModels/ReservationResultsViewModel'

const ResultCard: FC<{ result: any }> = ({ result }) => {
  console.log('Result card data:', result)
  console.log('Avatar URL:', result.user.avatar)
  console.log('User model:', result.user)
  return (
    <TouchableOpacity activeOpacity={0.85}>
      <View style={styles.cardContainer}>
        <View style={styles.leftContainer}>
          <Image
            source={{ uri: result.user.avatar }}
            style={styles.profileImage}
            resizeMode="cover"
            onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
            onLoad={() => console.log('Image loaded successfully')}
          />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.userName}>{result.user.fullName}</Text>
          <View style={styles.row}>
            <PPMaterialIcon icon="phone" size={16} color={Color.black[400]} />
            <Text style={styles.detail}>{result.user.phoneNumber}</Text>
          </View>
          <View style={styles.row}>
            <PPMaterialIcon icon="star" size={16} color={Color.brand1[600]} />
            <Text style={styles.detail}>{result.rate} ({result.reviews} reviews)</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const ReservationResultsScreen: FC = () => {
  const { state, searchResults } = useReservationResultsViewModel()

  useEffect(() => {
    searchResults()
  }, [])

  console.log('Screen state:', state)

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {state.loading && (
        <Loader loading={state.loading} opacity={0.85} animal="dog" />
      )}
      <ScrollView style={styles.content}>
        {state.results.map((result) => (
          <ResultCard key={result.user.id} result={result} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.mainBackground },
  content: { flex: 1, padding: 20 },
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
    backgroundColor: Color.brand1[100],
    borderWidth: 1,
    borderColor: Color.brand1[300],
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
    ...LabelStyle.callout2({ color: Color.black[400] }),
    marginLeft: 6,
    flexShrink: 1,
  },
})

export { ReservationResultsScreen }
