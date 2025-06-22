import { View, Text, StyleSheet } from 'react-native'
import { useI18n } from '../domain/hooks/i18n'
import { AnimatedView } from './AnimatedView'
import { LabelStyle } from '../style/Styles'
import { Color } from '../style/Color'

type EmptyViewType = 'error' | 'empty'

type EmptyViewProps = {
  title: string
  subtitle: string
  type: EmptyViewType
}

const EmptyView: React.FC<EmptyViewProps> = ({ title, subtitle, type }) => {
  const { t } = useI18n()

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text
          style={LabelStyle.title1({
            color: Color.black[700],
            textAlign: 'center',
          })}
        >
          {title}
        </Text>
        <Text
          style={LabelStyle.body({
            color: Color.black[500],
            textAlign: 'center',
          })}
        >
          {subtitle}
        </Text>
      </View>
      <AnimatedView
        filePath={
          type === 'empty'
            ? require('@app/assets/lottie-json/cat-sleep.json')
            : require('@app/assets/lottie-json/cat-play.json')
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContainer: {
    alignItems: 'center',
    gap: 10,
  },
})

export { EmptyView }
