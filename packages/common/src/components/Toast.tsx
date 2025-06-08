import { View, Image, Text, Platform, StyleSheet, Animated } from 'react-native'
import Toast from 'react-native-toast-message'
import { Color, StateColor } from '../style/Color'
import { LabelStyle } from '../style/Styles'
import React, { useEffect, useRef, useState } from 'react'

type GenericToastType = 'success' | 'error' | 'warning' | 'info'

type CustomToastProps = {
  uniqueKey?: string
  title: string
  subtitle: string
  config: GenericToastType
  duration?: number /// milliseconds
}

const CustomToast: React.FC<CustomToastProps> = ({
  uniqueKey,
  title,
  subtitle,
  config,
  duration,
}) => {
  const toastConfig = {
    success: {
      color: StateColor.success.focused,
      asset: require('@app/assets/toast/success.png'),
    },
    error: {
      color: StateColor.error.focused,
      asset: require('@app/assets/toast/error.png'),
    },
    warning: {
      color: StateColor.warning.focused,
      asset: require('@app/assets/toast/warning.png'),
    },
    info: {
      color: Color.brand1[400],
      asset: require('@app/assets/toast/info.png'),
    },
  }
  const { color, asset } = toastConfig[config]

  const progressAnim = useRef(new Animated.Value(0)).current
  const [parentWidth, setParentWidth] = useState(0)

  useEffect(() => {
    progressAnim.setValue(0)
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: false,
    }).start()
  }, [uniqueKey, duration, progressAnim])

  const animatedWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, parentWidth],
  })

  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout
    setParentWidth(width)
  }

  return (
    <View style={styles.container}>
      <View style={styles.whiteCard} onLayout={handleLayout}>
        <View style={styles.detailsRow}>
          <Image style={styles.icon} source={asset} />
          <View style={styles.textContainer}>
            <Text
              style={{
                ...LabelStyle.body2({ fontWeight: 300, color: color }),
                paddingBottom: 3,
              }}
            >
              {title}
            </Text>
            <Text
              style={LabelStyle.title2({
                fontWeight: 400,
                color: Color.black[600],
              })}
            >
              {subtitle}
            </Text>
          </View>
        </View>
        <Animated.View
          style={{
            height: 2,
            width: animatedWidth,
            backgroundColor: color,
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
  },
  whiteCard: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: Color.black[10],
    borderWidth: 1,
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
  },
  icon: {
    width: 32,
    aspectRatio: 1,
    marginRight: 15,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
})

const GenericToast: React.FC<{ overrideOffset?: number }> = ({
  overrideOffset,
}) => {
  return (
    <Toast
      config={{
        pawPalsToast: ({ text1, text2, props }) => (
          <CustomToast
            title={text1}
            subtitle={text2}
            config={props.config}
            duration={props.duration}
            uniqueKey={new Date().getTime().toString()}
          />
        ),
      }}
      topOffset={overrideOffset ?? (Platform.OS === 'ios' ? 60 : 40)}
    />
  )
}

const ShowToast = ({ config, title, subtitle, duration }: CustomToastProps) => {
  const visibilityDuration = duration ?? 4000
  Toast.show({
    type: 'pawPalsToast',
    text1: title,
    text2: subtitle,
    visibilityTime: visibilityDuration,
    props: { config: config, duration: visibilityDuration },
  })
}

export { GenericToastType, GenericToast, ShowToast }
