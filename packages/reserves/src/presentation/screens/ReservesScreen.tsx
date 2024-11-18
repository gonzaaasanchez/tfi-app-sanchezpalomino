import { Color } from '@packages/common'
import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ReservesScreen: FC = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>{'Reserves Screen'}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.brand2[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export { ReservesScreen }
