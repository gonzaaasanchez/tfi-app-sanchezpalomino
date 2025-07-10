import React, { FC, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
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
  PaginatedScrollView,
  LabelStyle,
} from '@packages/common'
import { useReservationResultsViewModel } from '../../viewModels/ReservationResultsViewModel'
import { useNavigation } from '@react-navigation/native'
import { SortField, SortOrder } from '../../../data/models/SearchCriteria'
import { SearchResultCard } from './components/SearchResultCard'
import { FilterResultsSheetContent } from './components/FilterResultsSheetContent'
import { ConfirmationSheetContent } from './components/ConfirmationSheetContent'
import catSuccess from '@app/assets/lottie-json/success-cat.json'
import { useDispatch } from 'react-redux'
import { markStatusChanged } from '@packages/reserves/src/domain/store/ReservesSlice'

const ReservationResultsScreen: FC = () => {
  const {
    state,
    setSortAndOrder,
    setUserToRequest,
    sendReservationRequest,
    searchResults,
  } = useReservationResultsViewModel()
  const { t } = useI18n()
  const navigation = useNavigation()
  const filterBottomSheetRef = useBottomSheetModalRef()
  const confirmationBottomSheetRef = useBottomSheetModalRef()
  const sucessBottomSheetRef = useBottomSheetModalRef()
  const dispatch = useDispatch()

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

  return (
    <PPBottomSheetContainer>
      <SafeAreaView style={styles.container} edges={[]}>
        <Text style={styles.resultsCount}>
          {t('reserveResultsScreen.totalDescripcion', {
            total: state.pagination.pagination.total.toString(),
          })}
        </Text>
        <PaginatedScrollView
          pagination={state.pagination}
          onLoadMore={() => searchResults({ reset: false })}
          onRefresh={() => searchResults({ reset: true })}
          contentContainerStyle={styles.content}
          renderItem={(result) => (
            <SearchResultCard
              key={result.caregiver.id}
              result={result}
              onPress={() => setUserToRequest(result)}
            />
          )}
          emptyComponent={
            <EmptyView
              type="empty"
              title={t('reserveResultsScreen.emptyState.title')}
              subtitle={t('reserveResultsScreen.emptyState.subtitle')}
            />
          }
        />
        {(state.loading || state.pagination.loading) && (
          <Loader loading={true} />
        )}
        <GenericToast overrideOffset={10} />
      </SafeAreaView>
      <PPBottomSheet.Empty ref={filterBottomSheetRef} dismisseable={true}>
        <FilterResultsSheetContent
          sortOptions={state.sortOptions}
          sortOrderOptions={state.sortOrderOptions}
          sortField={state.searchCriteria?.sortBy?.field || SortField.PRICE}
          sortOrder={state.searchCriteria?.sortBy?.order || SortOrder.DESC}
          confirmSortAndOrder={(sortField, sortOrder) => {
            setSortAndOrder(sortField, sortOrder)
            filterBottomSheetRef.current?.dismiss()
          }}
        />
      </PPBottomSheet.Empty>
      <PPBottomSheet.Empty
        ref={confirmationBottomSheetRef}
        dismisseable={false}
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
        onPrimaryAction={() => {
          navigation.getParent()?.goBack()
          dispatch(markStatusChanged())
        }}
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
  resultsCount: {
    ...LabelStyle.callout2({
      color: Color.black[600],
      textAlign: 'center',
    }),
    paddingVertical: 5,
  },
})

export { ReservationResultsScreen }
