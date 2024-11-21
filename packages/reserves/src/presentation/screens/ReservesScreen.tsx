import { Color, useI18n } from '@packages/common'
import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ReservationsHeader from '../components/ReservationsHeader'
import { useReservesViewModel } from '../viewModels/ReservesViewModel'

const ReservesScreen: FC = (): JSX.Element => {
  const { state, setReserveType, setReserveStatus } = useReservesViewModel()

  const { t } = useI18n()

  return (
    <View style={styles.container}>
      <ReservationsHeader
        defaultSelectedStatus={state.selectedStatus}
        defaultSelectedType={state.selectedType}
        onTypeSelected={setReserveType}
        onStatusSelected={setReserveStatus}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.brand2[100],
  },
})

export { ReservesScreen }
