import { Color, useI18n } from '@packages/common'
import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const FeedScreen: FC = (): JSX.Element => {
  const { t } = useI18n()
  return (
    <View style={styles.container} accessible={false}>
      <Text >{t('feedScreen.title')}</Text>
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

export { FeedScreen }
