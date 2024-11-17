import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ProfileScreen: FC = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>{'Profile Screen'}</Text>
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

export { ProfileScreen }
