import React, { FC, useEffect, useState } from 'react'
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
  PPBottomSheet,
  PPBottomSheetContainer,
  useBottomSheetModalRef,
  Button,
} from '@packages/common'
import { useI18n } from '@packages/common/src/domain/hooks/i18n'
import { useReservationResultsViewModel } from '../../viewModels/ReservationResultsViewModel'
import { useNavigation } from '@react-navigation/native'
import { SortField, SortOrder } from '../../../data/models/SearchCriteria'

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
  const { state, setSortAndOrder } = useReservationResultsViewModel()
  const [sortField, setSortField] = useState<SortField>(
    state.searchCriteria?.sortBy?.field || SortField.REVIEWS
  )
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    state.searchCriteria?.sortBy?.order || SortOrder.DESC
  )
  const { t } = useI18n()
  const navigation = useNavigation()
  const bottomSheetRef = useBottomSheetModalRef()

  useEffect(() => {
    if (state.searchCriteria) {
      setSortField(state.searchCriteria.sortBy.field)
      setSortOrder(state.searchCriteria.sortBy.order)
    }
  }, [state.searchCriteria])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => bottomSheetRef.current?.present()}>
          <PPMaterialIcon icon="sort" size={24} color={'white'} />
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  const confirmSortAndOrder = () => {
    setSortAndOrder(sortField, sortOrder)
    bottomSheetRef.current?.dismiss()
  }

  const BottomSheetContent = () => {
    const handleSortOptionPress = (field: SortField) => {
      setSortField(field)
    }

    const handleSortOrderPress = (field: SortOrder) => {
      setSortOrder(field)
    }

    const RadioButton = ({
      isSelected,
      onPress,
    }: {
      isSelected: boolean
      onPress: () => void
    }) => {
      return (
        <TouchableOpacity onPress={onPress}>
          <PPMaterialIcon
            icon={
              isSelected ? 'radio-button-checked' : 'radio-button-unchecked'
            }
            size={24}
            color={isSelected ? Color.brand1[600] : Color.black[400]}
          />
        </TouchableOpacity>
      )
    }

    const SectionOptionsList = <T extends SortField | SortOrder>({
      title,
      options,
      selectedValue,
      onSelect,
    }: {
      title: string
      options: readonly { readonly field: T; readonly label: string }[]
      selectedValue: T
      onSelect: (value: T) => void
    }) => {
      return (
        <>
          <Text style={styles.bottomSheetTitle}>{title}</Text>
          {options.map((option, index) => (
            <View key={option.field}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.sortOption}
                onPress={() => onSelect(option.field)}
              >
                <Text style={LabelStyle.body({ color: Color.black[700] })}>
                  {t(option.label)}
                </Text>
                <RadioButton
                  isSelected={selectedValue === option.field}
                  onPress={() => onSelect(option.field)}
                />
              </TouchableOpacity>
              {index < options.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </>
      )
    }

    return (
      <View>
        <SectionOptionsList
          title={t('reserveResultsScreen.sort.title')}
          options={state.sortOptions}
          selectedValue={sortField}
          onSelect={handleSortOptionPress}
        />
        <View style={styles.sectionSeparator} />
        <SectionOptionsList
          title={t('reserveResultsScreen.sort.criteria')}
          options={state.sortOrderOptions}
          selectedValue={sortOrder}
          onSelect={handleSortOrderPress}
        />
        <Button.Primary
          style={{ marginTop: 16 }}
          title={t('reserveResultsScreen.sort.confirm')}
          onPress={confirmSortAndOrder}
        />
      </View>
    )
  }

  return (
    <PPBottomSheetContainer>
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
      <PPBottomSheet.Empty ref={bottomSheetRef} dismisseable={true}>
        <BottomSheetContent />
      </PPBottomSheet.Empty>
    </PPBottomSheetContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.mainBackground,
  },
  content: {
    flex: 1,
    padding: 20,
  },
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
  bottomSheetTitle: {
    ...LabelStyle.title2({ color: Color.black[700] }),
    marginBottom: 5,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  separator: {
    height: 1,
    backgroundColor: Color.black[100],
  },
  sectionSeparator: {
    height: 16,
  },
})

export { ReservationResultsScreen }
