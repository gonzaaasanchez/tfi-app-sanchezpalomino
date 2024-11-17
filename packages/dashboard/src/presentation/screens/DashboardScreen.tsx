import { useI18n } from '@packages/common'
import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const DashboardScreen: FC = (): JSX.Element => {
  const { t } = useI18n()
  return (
    <View style={styles.container} accessible={false}>
      <Text testID="dashboardScreen.title">{t('dashboardScreen.title')}</Text>
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

export { DashboardScreen }
