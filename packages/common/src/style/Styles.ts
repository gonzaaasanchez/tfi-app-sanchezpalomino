import { TextStyle } from 'react-native'
import { Color } from './Color'
import { DefaultTheme } from '@react-navigation/native'

const SourGummyWithWeight = {
  100: 'SourGummy-Thin',
  200: 'SourGummy-ExtraLight',
  300: 'SourGummy-Light',
  400: 'SourGummy-Regular',
  500: 'SourGummy-Medium',
  600: 'SourGummy-Semibold',
  700: 'SourGummy-Bold',
  800: 'SourGummy-ExtraBold',
  900: 'SourGummy-Black',
}

const LabelStyle = {
  largeTitle: (
    fontWeight: keyof typeof SourGummyWithWeight = 400,
    fontSize: number = 32
  ): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign: 'left',
  }),
  title1: (
    fontWeight: keyof typeof SourGummyWithWeight = 500,
    fontSize: number = 26
  ): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign: 'left',
  }),
  title2: (
    fontWeight: keyof typeof SourGummyWithWeight = 500,
    fontSize: number = 20
  ): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign: 'left',
  }),
  title3: (
    fontWeight: keyof typeof SourGummyWithWeight = 500,
    fontSize: number = 18
  ): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign: 'left',
  }),
  body: (
    fontWeight: keyof typeof SourGummyWithWeight = 400,
    fontSize: number = 16
  ): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign: 'left',
  }),
  body2: (
    fontWeight: keyof typeof SourGummyWithWeight = 400,
    fontSize: number = 14
  ): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign: 'left',
  }),
  callout: (
    fontWeight: keyof typeof SourGummyWithWeight = 300,
    fontSize: number = 16
  ): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign: 'left',
  }),
  callout2: (
    fontWeight: keyof typeof SourGummyWithWeight = 300,
    fontSize: number = 14
  ): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign: 'left',
  }),
  link: (
    fontWeight: keyof typeof SourGummyWithWeight = 400,
    fontSize: number = 14
  ): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign: 'left',
  }),
  link2: (
    fontWeight: keyof typeof SourGummyWithWeight = 400,
    fontSize: number = 12
  ): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign: 'left',
  }),
  subhead: (
    fontWeight: keyof typeof SourGummyWithWeight = 400,
    fontSize: number = 12
  ): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign: 'left',
  }),
  footnote: (
    fontWeight: keyof typeof SourGummyWithWeight = 400,
    fontSize: number = 12
  ): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign: 'left',
  }),
  caption1: (
    fontWeight: keyof typeof SourGummyWithWeight = 400,
    fontSize: number = 11
  ): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign: 'left',
  }),
  caption2: (
    fontWeight: keyof typeof SourGummyWithWeight = 400,
    fontSize: number = 10
  ): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign: 'left',
  }),
}

const GeneralStyle = {
  header: {
    headerStyle: {
      backgroundColor: Color.brand1[700],
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontSize: 18,
      fontFamily: 'SourGummy-Medium',
    },
  },
}

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    backgroundColor: Color.brand1[200],
  },
}

export { LabelStyle, LightTheme, GeneralStyle, SourGummyWithWeight }
