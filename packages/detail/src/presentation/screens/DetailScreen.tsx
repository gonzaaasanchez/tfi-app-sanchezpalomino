import { useRoute } from '@react-navigation/native'
import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props = {
  param: string
}

const DetailScreen: FC<Props> = (): JSX.Element => {
  const route = useRoute()
  const { param } = route.params as Props
  return (
    <View style={styles.container}>
      <Text>{'Detail Screen'}</Text>
      <Text>{param}</Text>
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

export { DetailScreen }
