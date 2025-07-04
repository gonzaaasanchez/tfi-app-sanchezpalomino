import { FC } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import {
  Color,
  GeneralStyle,
  getImageFullUrl,
  ImageWithPlaceholder,
  LabelStyle,
  PPMaterialIcon,
  Types,
  useI18n,
  useInjection,
} from '@packages/common'
import { SearchResultModel } from '../../../../data/models/SearchResultModel'

export const SearchResultCard: FC<{
  result: SearchResultModel
  onPress: () => void
}> = ({ result, onPress }) => {
  const baseUrl = useInjection(Types.BaseURL) as string

  const { t } = useI18n()

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <View style={styles.cardContainer}>
        <View style={styles.leftContainer}>
          <ImageWithPlaceholder
            source={getImageFullUrl(result.caregiver.avatar, baseUrl)}
            dimension={60}
          />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.userName}>{result.caregiver.fullName}</Text>
          <View style={styles.row}>
            <PPMaterialIcon icon="phone" size={16} />
            <Text style={styles.detail}>{result.caregiver.phoneNumber}</Text>
          </View>

          <View style={styles.row}>
            <PPMaterialIcon icon="location-on" size={16} />
            <Text style={styles.detail}>A {result.distance} km</Text>
          </View>
          <View style={styles.row}>
            <PPMaterialIcon icon="star" size={16} />
            <Text style={styles.detail}>
              {t('reserveResultsScreen.reviews', {
                average: result.caregiver.reviews?.averageRatingAsCaregiver.toString() || '0',
                total: result.caregiver.reviews?.totalReviewsAsCaregiver.toString() || '0',
              })}
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <View style={styles.priceRow}>
              <PPMaterialIcon icon="attach-money" size={16} />
              <Text style={styles.detail}>
                {t('reserveResultsScreen.price.caretakerFee')}: $
                {result.totalPrice}
              </Text>
            </View>
            <View style={styles.priceRow}>
              <PPMaterialIcon icon="percent" size={16} />
              <Text style={styles.detail}>
                {t('reserveResultsScreen.price.commission')}: $
                {result.commission}
              </Text>
            </View>
            <View style={[styles.priceRow, styles.totalPriceRow]}>
              <PPMaterialIcon icon="payments" size={16} />
              <Text style={[styles.detail, styles.totalPrice]}>
                {t('reserveResultsScreen.price.total')}: ${result.totalOwner}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    ...GeneralStyle.card,
    flexDirection: 'row',
    padding: 16,
    marginBottom: 12,
  },
  leftContainer: {
    marginRight: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 5,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    ...LabelStyle.body({ fontWeight: 600, color: Color.black[700] }),
  },
  detail: {
    ...LabelStyle.callout2({ color: Color.black[500] }),
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
