import React, { FC, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import {
  Color,
  Loader,
  PPBottomSheet,
  PPBottomSheetContainer,
  useBottomSheetModalRef,
  useI18n,
  PPMaterialIcon,
  ShowToast,
  GenericToast,
  EmptyView,
} from '@packages/common'
import { useReservationResultsViewModel } from '../../viewModels/ReservationResultsViewModel'
import { useNavigation } from '@react-navigation/native'
import { SortField, SortOrder } from '../../../data/models/SearchCriteria'
import { SearchResultCard } from './components/SearchResultCard'
import { FilterSheetContent } from './components/FilterSheetContent'
import { ConfirmationSheetContent } from './components/ConfirmationSheetContent'
import catSuccess from '@app/assets/lottie-json/success-cat.json'

const ReservationResultsScreen: FC = () => {
  const { state, setSortAndOrder, setUserToRequest, sendReservationRequest } =
    useReservationResultsViewModel()
  const [sortField, setSortField] = useState<SortField>(
    state.searchCriteria?.sortBy?.field || SortField.PRICE
  )
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    state.searchCriteria?.sortBy?.order || SortOrder.DESC
  )
  const { t } = useI18n()
  const navigation = useNavigation()
  const filterBottomSheetRef = useBottomSheetModalRef()
  const confirmationBottomSheetRef = useBottomSheetModalRef()
  const sucessBottomSheetRef = useBottomSheetModalRef()

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
    if (state.requestSent) {
      sucessBottomSheetRef.current?.present()
    }
  }, [state.requestSent])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={filterBottomSheetRef.current?.present}>
          <PPMaterialIcon icon="sort" size={24} color={'white'} />
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  useEffect(() => {
    if (state.error !== null) {
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: state.error,
      })
    }
  }, [state.error])

  const confirmSortAndOrder = () => {
    setSortAndOrder(sortField, sortOrder)
    filterBottomSheetRef.current?.dismiss()
  }

  return (
    <PPBottomSheetContainer>
      <SafeAreaView style={styles.container} edges={[]}>
        <ScrollView contentContainerStyle={styles.content}>
          {!state.loading && state.results.length === 0 && (
            <EmptyView
              type="empty"
              title={t('reserveResultsScreen.emptyState.title')}
              subtitle={t('reserveResultsScreen.emptyState.subtitle')}
            />
          )}
          {state.results.map((result) => (
            <SearchResultCard
              key={result.caregiver._id}
              result={result}
              onPress={() => setUserToRequest(result)}
            />
          ))}
        </ScrollView>
        {state.loading && <Loader loading={state.loading} />}
        <GenericToast overrideOffset={10} />
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
      <PPBottomSheet.Empty
        ref={confirmationBottomSheetRef}
        dismisseable={true}
        onDismiss={() => setUserToRequest(null)}
      >
        <ConfirmationSheetContent
          resultItem={state.userToRequest}
          searchCriteria={state.searchCriteria}
          onConfirm={() => {
            confirmationBottomSheetRef.current?.dismiss()
            setUserToRequest(null)
            sendReservationRequest()
          }}
          onBack={() => {
            confirmationBottomSheetRef.current?.dismiss()
            setUserToRequest(null)
          }}
        />
      </PPBottomSheet.Empty>
      <PPBottomSheet.Dialog
        ref={sucessBottomSheetRef}
        title={t('reserveResultsScreen.success.title')}
        subtitle={t('reserveResultsScreen.success.message')}
        lottieFile={catSuccess}
        onPrimaryAction={() => navigation.getParent()?.goBack()}
      />
    </PPBottomSheetContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.mainBackground,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
})

export { ReservationResultsScreen }
