import React, { FC, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import {
  Color,
  LabelStyle,
  Loader,
  PPBottomSheet,
  PPBottomSheetContainer,
  useBottomSheetModalRef,
  useI18n,
  Button,
  PPMaterialIcon,
} from '@packages/common'
import { useReservationResultsViewModel } from '../../viewModels/ReservationResultsViewModel'
import { useNavigation } from '@react-navigation/native'
import { SortField, SortOrder } from '../../../data/models/SearchCriteria'
import { PlaceType } from '../../../data/models/ReservationModel'
import { SearchResultCard } from './components/SearchResultCard'
import { FilterSheetContent } from './components/FilterSheetContent'
import { ConfirmationSheetContent } from './components/ConfirmationSheetContent'

const ReservationResultsScreen: FC = () => {
  const { state, setSortAndOrder, setUserToRequest } =
    useReservationResultsViewModel()
  const [sortField, setSortField] = useState<SortField>(
    state.searchCriteria?.sortBy?.field || SortField.REVIEWS
  )
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    state.searchCriteria?.sortBy?.order || SortOrder.DESC
  )
  const { t } = useI18n()
  const navigation = useNavigation()
  const filterBottomSheetRef = useBottomSheetModalRef()
  const confirmationBottomSheetRef = useBottomSheetModalRef()

  useEffect(() => {
    if (state.searchCriteria) {
      setSortField(state.searchCriteria.sortBy.field)
      setSortOrder(state.searchCriteria.sortBy.order)
    }
  }, [state.searchCriteria])

  useEffect(() => {
    if (state.userToRequest) {
      confirmationBottomSheetRef.current?.present()
    }
  }, [state.userToRequest])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={filterBottomSheetRef.current?.present}>
          <PPMaterialIcon icon="sort" size={24} color={'white'} />
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  const confirmSortAndOrder = () => {
    setSortAndOrder(sortField, sortOrder)
    filterBottomSheetRef.current?.dismiss()
  }

  return (
    <PPBottomSheetContainer>
      <SafeAreaView style={styles.container} edges={['bottom']}>
        {state.loading && (
          <Loader loading={state.loading} opacity={0.85} animal="dog" />
        )}
        <ScrollView style={styles.content}>
          {state.results.map((result) => (
            <SearchResultCard
              key={result.user.id}
              result={result}
              onPress={() => setUserToRequest(result)}
            />
          ))}
        </ScrollView>
        {state.loading && (
          <Loader loading={state.loading} opacity={0.85} animal="dog" />
        )}
      </SafeAreaView>
      <PPBottomSheet.Empty ref={filterBottomSheetRef} dismisseable={true}>
        <FilterSheetContent
          sortOptions={state.sortOptions}
          sortOrderOptions={state.sortOrderOptions}
          sortField={sortField}
          sortOrder={sortOrder}
          handleSortOptionPress={setSortField}
          handleSortOrderPress={setSortOrder}
          confirmSortAndOrder={confirmSortAndOrder}
        />
      </PPBottomSheet.Empty>
      <PPBottomSheet.Empty ref={confirmationBottomSheetRef} dismisseable={true}>
        <ConfirmationSheetContent
          userToRequest={state.userToRequest}
          searchCriteria={state.searchCriteria}
          onConfirm={() => {
            console.log('onConfirm')
          }}
          onBack={() => {
            confirmationBottomSheetRef.current?.dismiss()
            setUserToRequest(null)
          }}
        />
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
})

export { ReservationResultsScreen }
