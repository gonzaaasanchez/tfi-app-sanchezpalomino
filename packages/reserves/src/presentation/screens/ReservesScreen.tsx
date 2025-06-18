import {
  Color,
  Loader,
  ShowToast,
  PPMaterialIcon,
  useI18n,
  GeneralStyle,
  HomeTabsHeight,
  EmptyView,
} from '@packages/common'
import React, { FC, useCallback, useEffect, useState } from 'react'
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  LayoutChangeEvent,
  TouchableOpacity,
} from 'react-native'
import ReservationsHeader from '../components/ReservationsHeader'
import { useReservesViewModel } from '../viewModels/ReservesViewModel'
import ReservationCard from '../components/ReservationCard'
import { StackActions, useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ReservesScreen: FC = (): JSX.Element => {
  const { state, setReserveType, setReserveStatus, getReserves } =
    useReservesViewModel()
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [availableHeight, setAvailableHeight] = useState<number>(0)

  const { t } = useI18n()

  useEffect(() => {
    setIsRefreshing(false)
    if (state.error) {
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: state.error,
      })
    }
  }, [state.error])

  useEffect(() => {
    getReserves()
  }, [state.selectedStatus, state.selectedType])

  const onRefresh = useCallback(() => {
    setIsRefreshing(true)
    getReserves().finally(() => setIsRefreshing(false))
  }, [getReserves])

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    const tabbarAproxHeight = 130
    setAvailableHeight(height - tabbarAproxHeight)
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        {state.loading && (
          <Loader loading={state.loading} opacity={0.85}/>
        )}
        <ReservationsHeader
          defaultSelectedStatus={state.selectedStatus}
          defaultSelectedType={state.selectedType}
          onTypeSelected={(type) => setReserveType(type)}
          onStatusSelected={(status) => setReserveStatus(status)}
        />
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          contentInsetAdjustmentBehavior="always"
          onLayout={handleLayout}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor={Color.brand1[100]}
            />
          }
        >
          {state.reserves?.length === 0 ? (
            <View
              style={[styles.emptyViewContainer, { height: availableHeight }]}
            >
              <EmptyView
                type="error"
                title={t('general.ups')}
                subtitle={t('general.emptyList')}
              />
            </View>
          ) : (
            state.reserves.map((reservation, index) => (
              <ReservationCard
                key={index}
                reservation={reservation}
                onReservationSelected={() => {
                  navigation.dispatch(
                    StackActions.push('reservationDetail', {
                      reservation: reservation,
                    })
                  )
                }}
              />
            ))
          )}
        </ScrollView>
      </View>

      {state.selectedType === 'sent' && (
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.mainBackground,
  },
  emptyViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 80 + 30, //tabbar aprox height + padding
    gap: 10,
  },
})

export { ReservesScreen }
