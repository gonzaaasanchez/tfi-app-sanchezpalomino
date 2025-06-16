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
import {
  Color,
  LabelStyle,
  PPMaterialIcon,
  Loader,
  GeneralStyle,
} from '@packages/common'
import { useI18n } from '@packages/common/src/domain/hooks/i18n'
import { useReservationResultsViewModel } from '../../viewModels/ReservationResultsViewModel'

const ResultCard: FC<{ result: any }> = ({ result }) => {
  const { t } = useI18n()

  return (
    <TouchableOpacity activeOpacity={0.85}>
      <View style={styles.cardContainer}>
        <View style={styles.leftContainer}>
          <Image
            source={{ uri: result.user.avatar }}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.userName}>{result.user.fullName}</Text>
          <View style={styles.row}>
            <PPMaterialIcon icon="phone" size={16} color={Color.black[400]} />
            <Text style={styles.detail}>{result.user.phoneNumber}</Text>
          </View>

          <View style={styles.row}>
            <PPMaterialIcon
              icon="location-on"
              size={16}
              color={Color.black[400]}
            />
            <Text style={styles.detail}>{result.distance} km</Text>
          </View>
          <View style={styles.row}>
            <PPMaterialIcon icon="star" size={16} color={Color.black[400]} />
            <Text style={styles.detail}>
              {result.rate.value} ({result.rate.count}{' '}
              {t('reserveResultsScreen.reviews')})
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <View style={styles.priceRow}>
              <PPMaterialIcon
                icon="attach-money"
                size={16}
                color={Color.black[400]}
              />
              <Text style={styles.detail}>
                {t('reserveResultsScreen.price.caretakerFee')}: $
                {result.price.fee}
              </Text>
            </View>
            <View style={styles.priceRow}>
              <PPMaterialIcon
                icon="percent"
                size={16}
                color={Color.black[400]}
              />
              <Text style={styles.detail}>
                {t('reserveResultsScreen.price.commission')}: $
                {result.price.charge}
              </Text>
            </View>
            <View style={[styles.priceRow, styles.totalPriceRow]}>
              <PPMaterialIcon
                icon="payments"
                size={16}
                color={Color.brand1[600]}
              />
              <Text style={[styles.detail, styles.totalPrice]}>
                {t('reserveResultsScreen.price.total')}: ${result.price.total}
              </Text>
            </View>
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
      {state.loading && (
        <Loader loading={state.loading} opacity={0.85} animal="dog" />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.mainBackground },
  content: { flex: 1, padding: 20 },
  cardContainer: {
    ...GeneralStyle.card,
    flexDirection: 'row',
    padding: 16,
    marginBottom: 12,
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
  priceContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Color.black[100],
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  totalPriceRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Color.black[100],
  },
  totalPrice: {
    color: Color.brand1[600],
    fontWeight: '600',
  },
})

export { ReservationResultsScreen }
