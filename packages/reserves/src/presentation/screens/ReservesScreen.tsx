import { Color, Loader, useI18n } from '@packages/common'
import React, {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from 'react'
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  LayoutChangeEvent,
} from 'react-native'
import ReservationsHeader from '../components/ReservationsHeader'
import { useReservesViewModel } from '../viewModels/ReservesViewModel'
import { EmptyView } from '@packages/common/src/components/EmptyView'

const ReservesScreen: FC = (): JSX.Element => {
  const { state, setReserveType, setReserveStatus, getReserves } =
    useReservesViewModel()
  const bottomSheetModalRef = useRef(null)
  const [alertTitle, setAlertTitle] = useState('')
  const [alertSubtitle, setAlertSubtitle] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [availableHeight, setAvailableHeight] = useState<number>(0)

  const { t } = useI18n()

  const showAlert = (title: string, subtitle: string) => {
    setAlertTitle(title)
    setAlertSubtitle(subtitle)
    bottomSheetModalRef.current?.present()
  }

  useEffect(() => {
    if (state.error !== null) {
      showAlert(t('loginScreen.error.title'), state.error)
    }
  }, [state.error])

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
    <View style={styles.container}>
      {state.loading && (
        <Loader loading={state.loading} opacity={0.85} animal="dog" />
      )}
      <ReservationsHeader
        defaultSelectedStatus={state.selectedStatus}
        defaultSelectedType={state.selectedType}
        onTypeSelected={(type) => {
          console.log('setReserveType ' + type)
          setReserveType(type)
        }}
        onStatusSelected={(status) => {
          console.log('setReserveStatus ' + status)
          setReserveStatus(status)
        }}
      />
      <ScrollView
        onLayout={handleLayout}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={Color.brand1[500]}
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
          <Text>Contenido de las reservas</Text>
        )}
      </ScrollView>
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
})

export { ReservesScreen }
