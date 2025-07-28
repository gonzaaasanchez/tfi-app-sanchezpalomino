import {
  Color,
  Loader,
  ShowToast,
  PPMaterialIcon,
  useI18n,
  GeneralStyle,
  HomeTabsHeight,
  EmptyView,
  PaginatedScrollView,
  useInjection,
  Types,
  useBottomSheetModalRef,
  PPBottomSheet,
} from '@packages/common'
import React, { FC, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import ReservationsHeader from '../components/ReservationsHeader'
import { useReservesViewModel } from '../viewModels/ReservesViewModel'
import ReservationCard from '../components/ReservationCard'
import { StackActions, useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ReserveStatus, ReserveType } from '../../data/models/ReservationModel'
import { FilterReservesSheetContent } from './new/components/FilterReservesSheetContent'

const ReservesScreen: FC = (): JSX.Element => {
  const { state, setReserveType, setReserveStatus, loadReserves } =
    useReservesViewModel()
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const baseUrl = useInjection(Types.BaseURL) as string
  const filterBottomSheetRef = useBottomSheetModalRef()
  const { t } = useI18n()

  useEffect(() => {
    if (state.error) {
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: state.error,
      })
    }
  }, [state.error])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={filterBottomSheetRef.current?.present}>
          <PPMaterialIcon icon="filter-alt" size={24} color={'white'} />
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <ReservationsHeader
          types={state.optionsType}
          defaultSelectedType={state.selectedType}
          onTypeSelected={setReserveType}
          currentStatus={state.selectedStatus}
        />
        <PaginatedScrollView
          pagination={state.pagination}
          contentContainerStyle={{
            ...styles.scrollContainer,
            paddingBottom:
              HomeTabsHeight +
              insets.bottom +
              20 +
              Number(GeneralStyle.addFloatingButton.height) +
              10,
          }}
          onLoadMore={() => loadReserves({ reset: false })}
          onRefresh={() => loadReserves({ reset: true })}
          renderItem={(item, index) => (
            <ReservationCard
              key={index}
              reservation={item}
              isUserRequest={state.selectedType === ReserveType.Owner}
              baseUrl={baseUrl}
              onReservationSelected={() => {
                navigation.dispatch(
                  StackActions.push('reservationDetail', {
                    reservation: item,
                    isUserRequest: state.selectedType === ReserveType.Owner,
                  })
                )
              }}
            />
          )}
          emptyComponent={
            <View style={styles.emptyViewContainer}>
              <EmptyView
                type="error"
                title={t('general.ups')}
                subtitle={t('reservesScreen.noData')}
              />
            </View>
          }
        />
      </View>

      {state.selectedType === 'owner' && (
        <TouchableOpacity
          style={{
            ...GeneralStyle.addFloatingButton,
            bottom: HomeTabsHeight + insets.bottom + 20,
          }}
          onPress={() =>
            navigation.dispatch(StackActions.push('reservationNewSteps'))
          }
        >
          <PPMaterialIcon icon="add" size={30} color={'white'} />
        </TouchableOpacity>
      )}

      <PPBottomSheet.Empty ref={filterBottomSheetRef} dismisseable={true}>
        <FilterReservesSheetContent
          statusOptions={state.optionsStatus}
          status={state.selectedStatus || ReserveStatus.Finished}
          confirm={(selectedStatus) => {
            setReserveStatus(selectedStatus)
            filterBottomSheetRef.current?.dismiss()
          }}
        />
      </PPBottomSheet.Empty>

      {(state.loading || state.pagination.loading) && <Loader loading={true} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.mainBackground,
  },
  emptyViewContainer: {
    marginTop: Number(GeneralStyle.addFloatingButton.height) + 20,
  },
  scrollContainer: {
    gap: 10,
  },
})

export { ReservesScreen }
