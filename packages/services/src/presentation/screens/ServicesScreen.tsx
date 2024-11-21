import { Color, useI18n } from '@packages/common'
import { EmptyView } from '@packages/common/src/components/EmptyView'
import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ServicesScreen: FC = (): JSX.Element => {
  const { t } = useI18n()

  return (
    <View style={styles.container}>
      <EmptyView
        type="empty"
        title={t('general.comingSoon')}
        subtitle={t('general.wereWorking')}
      />
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

export { ServicesScreen }
