import React, { FC, useRef } from 'react'
import { View, StyleSheet, Text, Modal } from 'react-native'
import { LabelStyle } from '../style/Styles'
import LottieView from 'lottie-react-native'
import dogWalk from '@app/assets/lottie-json/dog-walk.json'
import dogWaiting from '@app/assets/lottie-json/dog-waiting.json'
import catSleep from '@app/assets/lottie-json/cat-sleep.json'
import catPlay from '@app/assets/lottie-json/cat-play.json'

type LoaderProps = {
  loading: boolean
  animal?: 'dog' | 'cat' | 'all'
  opacity?: number
  message?: string
}

const DogLoaders = [dogWalk, dogWaiting]
const CatLoaders = [catSleep, catPlay]
const AllLoaders = DogLoaders && CatLoaders

const Loader: FC<LoaderProps> = ({
  loading,
  animal = 'all',
  opacity = 0.95,
  message: children,
}): JSX.Element => {
  const animation = useRef<LottieView>(null)
  const randomLoader = (
    animal === 'all' ? AllLoaders : animal === 'cat' ? CatLoaders : DogLoaders
  )[
    Math.floor(
      Math.random() *
        (animal === 'all'
          ? AllLoaders.length
          : animal === 'cat'
            ? CatLoaders.length
            : DogLoaders.length)
    )
  ]
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={loading}
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View
            style={{
              ...styles.background,
              opacity: opacity,
            }}
          />

          <LottieView
            autoPlay={true}
            ref={animation}
            style={{
              width: 200,
              height: 200,
            }}
            source={randomLoader}
          />

          {children != null && <Text style={styles.message}>{children}</Text>}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
  message: {
    ...LabelStyle.title2(),
    marginTop: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
})

export { Loader }
