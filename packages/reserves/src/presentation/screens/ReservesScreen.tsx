import {
  Color,
  Loader,
  PPBottomSheet,
  ShowToast,
  useI18n,
} from '@packages/common'
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  LayoutChangeEvent,
} from 'react-native'
import ReservationsHeader from '../components/ReservationsHeader'
import { useReservesViewModel } from '../viewModels/ReservesViewModel'
import { EmptyView } from '@packages/common/src/components/EmptyView'
import ReservationCard from '../components/ReservationCard'
import { AnimationObject } from 'lottie-react-native'
import cat404 from '@app/assets/lottie-json/cat-sleep.json'

const ReservesScreen: FC = (): JSX.Element => {
  const { state, setReserveType, setReserveStatus, getReserves } =
    useReservesViewModel()
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

  // Función para manejar el cálculo del espacio disponible
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
              <ReservationCard key={index} reservation={reservation} />
            ))
          )}
        </ScrollView>
      </View>
      <PPBottomSheet
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
    backgroundColor: Color.brand2[100],
  },
  emptyViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 80 + 30, //tabbar aprox height + padding
  },
})

export { ReservesScreen }
