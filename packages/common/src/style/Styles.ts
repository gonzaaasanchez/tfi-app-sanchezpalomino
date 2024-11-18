import { StyleSheet } from 'react-native'
import { Color } from './Color'
import { DefaultTheme } from '@react-navigation/native'

const LabelStyle = StyleSheet.create({
  largeTitle: {
    fontWeight: 400,
    fontSize: 32,
    textAlign: 'left',
  },
  title1: {
    fontWeight: 500,
    fontSize: 26,
    textAlign: 'left',
  },
  title2: {
    fontWeight: 500,
    fontSize: 20,
    textAlign: 'left',
  },
  title3: {
    fontWeight: 500,
    fontSize: 18,
    textAlign: 'left',
  },
  body: {
    fontWeight: 400,
    fontSize: 16,
    textAlign: 'left',
  },
  body2: {
    fontWeight: 400,
    fontSize: 14,
    textAlign: 'left',
  },
  callout: {
    fontWeight: 400,
    fontSize: 16,
    textAlign: 'left',
  },
  link: {
    fontWeight: 400,
    fontSize: 14,
    textAlign: 'left',
  },
  link2: {
    fontWeight: 400,
    fontSize: 12,
    textAlign: 'left',
  },
  subhead: {
    fontWeight: 400,
    fontSize: 12,
    textAlign: 'left',
  },
  footnote: {
    fontWeight: 400,
    fontSize: 12,
    textAlign: 'left',
  },
  caption1: {
    fontWeight: 400,
    fontSize: 11,
    textAlign: 'left',
  },
  caption2: {
    fontWeight: 400,
    fontSize: 10,
    textAlign: 'left',
  },
})

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    backgroundColor: Color.brand1[200],
  },
}

export { LabelStyle, LightTheme }
