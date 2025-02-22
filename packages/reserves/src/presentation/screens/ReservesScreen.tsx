import {
  Color,
  Loader,
  PPBottomSheet,
  ShowToast,
  PPMaterialIcon,
  useI18n,
} from '@packages/common'
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
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
import { EmptyView } from '@packages/common/src/components/EmptyView'
import ReservationCard from '../components/ReservationCard'
import { AnimationObject } from 'lottie-react-native'
import { StackActions, useNavigation } from '@react-navigation/native'
import { HomeTabsHeight } from '@packages/home/src/presentation/screens/HomeTabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ReservesScreen: FC = (): JSX.Element => {
  const { state, setReserveType, setReserveStatus, getReserves } =
    useReservesViewModel()
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const bottomSheetModalRef = useRef(null)
  const [alertTitle, setAlertTitle] = useState('')
  const [alertSubtitle, setAlertSubtitle] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [availableHeight, setAvailableHeight] = useState<number>(0)
  const [alertAnimation, setAlertAnimation] = useState(null)

  const { t } = useI18n()

  const showAlert = (
    title: string,
    subtitle: string,
    animation?: AnimationObject | null
  ) => {
    setAlertTitle(title)
    setAlertSubtitle(subtitle)
    setAlertAnimation(animation)
    bottomSheetModalRef.current?.present()
  }

  useEffect(() => {
    setIsRefreshing(false)
    if (state.error === 'MANAGE_ME') {
      showAlert(t('general.ups'), t('forgotPasswordScreen.error.message'))
      return
    } else if (state.error !== null) {
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
          <Loader loading={state.loading} opacity={0.85} animal="dog" />
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
            ...styles.add,
            bottom: HomeTabsHeight + insets.bottom + 20,
          }}
          onPress={() =>
            navigation.dispatch(StackActions.push('reservationNew'))
          }
        >
          <PPMaterialIcon icon="add" size={30} color={'white'} />
        </TouchableOpacity>
      )}

      <PPBottomSheet.Dialog
        ref={bottomSheetModalRef}
        title={alertTitle}
        subtitle={alertSubtitle}
        lottieFile={alertAnimation}
      />
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
  },
  add: {
    position: 'absolute',
    right: 20,
    backgroundColor: Color.brand1[700],
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
})

export { ReservesScreen }
