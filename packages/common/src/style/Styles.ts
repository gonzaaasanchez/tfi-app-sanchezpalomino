import { StyleSheet } from 'react-native'
import { Color } from './Color'
import { DefaultTheme } from '@react-navigation/native'

const FontFamilyByWeight = {
  SourGummy: {
    100: 'SourGummy-Thin',
    thin: 'SourGummy-Thin',
    200: 'SourGummy-ExtraLight',
    ultralight: 'SourGummy-ExtraLight',
    300: 'SourGummy-Light',
    light: 'SourGummy-Light',
    400: 'SourGummy-Regular',
    regular: 'SourGummy-Regular',
    500: 'SourGummy-Medium',
    medium: 'SourGummy-Medium',
    600: 'SourGummy-Semibold',
    semibold: 'SourGummy-Semibold',
    700: 'SourGummy-Bold',
    bold: 'SourGummy-Bold',
    800: 'SourGummy-ExtraBold',
    black: 'SourGummy-ExtraBold',
    900: 'SourGummy-Black',
    heavy: 'SourGummy-Heavy',
  },
}
const fontFamily = FontFamilyByWeight['SourGummy']

const LabelStyle = StyleSheet.create({
  largeTitle: {
    fontFamily: fontFamily[400],
    fontSize: 32,
    textAlign: 'left',
  },
  title1: {
    fontFamily: fontFamily[500],
    fontSize: 26,
    textAlign: 'left',
  },
  title2: {
    fontFamily: fontFamily[500],
    fontSize: 20,
    textAlign: 'left',
  },
  title3: {
    fontFamily: fontFamily[500],
    fontSize: 18,
    textAlign: 'left',
  },
  body: {
    fontFamily: fontFamily[400],
    fontSize: 16,
    textAlign: 'left',
  },
  body2: {
    fontFamily: fontFamily[400],
    fontSize: 14,
    textAlign: 'left',
  },
  callout: {
    fontFamily: fontFamily[300],
    fontSize: 16,
    textAlign: 'left',
  },
  callout2: {
    fontFamily: fontFamily[300],
    fontSize: 14,
    textAlign: 'left',
  },
  link: {
    fontFamily: fontFamily[400],
    fontSize: 14,
    textAlign: 'left',
  },
  link2: {
    fontFamily: fontFamily[400],
    fontSize: 12,
    textAlign: 'left',
  },
  subhead: {
    fontFamily: fontFamily[400],
    fontSize: 12,
    textAlign: 'left',
  },
  footnote: {
    fontFamily: fontFamily[400],
    fontSize: 12,
    textAlign: 'left',
  },
  caption1: {
    fontFamily: fontFamily[400],
    fontSize: 11,
    textAlign: 'left',
  },
  caption2: {
    fontFamily: fontFamily[400],
    fontSize: 10,
    textAlign: 'left',
  },
})

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

export { LabelStyle, LightTheme, GeneralStyle }
