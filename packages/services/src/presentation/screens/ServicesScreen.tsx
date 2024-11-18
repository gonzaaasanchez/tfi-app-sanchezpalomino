import { AnimatedView, Color, LabelStyle, useI18n } from '@packages/common'
import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ServicesScreen: FC = (): JSX.Element => {
  const { t } = useI18n()

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={{ ...LabelStyle.title1, color: Color.black[700] }}>
          {t('general.comingSoon')}
        </Text>
        <Text style={{ ...LabelStyle.body, color: Color.black[500] }}>
          {t('general.wereWorking')}
        </Text>
      </View>
      <AnimatedView
        filePath={require('@app/assets/lottie-json/cat-sleep.json')}
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
  messageContainer: {
    alignItems: 'center',
    gap: 10,
  },
})

export { ServicesScreen }
