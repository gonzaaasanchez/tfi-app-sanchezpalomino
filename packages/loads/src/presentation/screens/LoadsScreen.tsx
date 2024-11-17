import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const LoadsScreen: FC = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>{'Loads Screen'}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export { LoadsScreen }
