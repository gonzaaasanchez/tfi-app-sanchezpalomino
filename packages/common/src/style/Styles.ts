import { TextStyle, ViewStyle } from 'react-native'
import { Color } from './Color'
import { DefaultTheme } from '@react-navigation/native'

const HomeTabsHeight = 82

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
  largeTitle: ({
    fontWeight = 400,
    fontSize = 32,
    textAlign = 'left',
    color = Color.black[900],
  }: {
    fontWeight?: keyof typeof SourGummyWithWeight
    fontSize?: number
    textAlign?: 'left' | 'center' | 'right'
    color?: string
  } = {}): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign,
    color,
  }),

  title1: ({
    fontWeight = 500,
    fontSize = 26,
    textAlign = 'left',
    color = Color.black[900],
  }: {
    fontWeight?: keyof typeof SourGummyWithWeight
    fontSize?: number
    textAlign?: 'left' | 'center' | 'right'
    color?: string
  } = {}): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign,
    color,
  }),

  title2: ({
    fontWeight = 500,
    fontSize = 20,
    textAlign = 'left',
    color = Color.black[900],
  }: {
    fontWeight?: keyof typeof SourGummyWithWeight
    fontSize?: number
    textAlign?: 'left' | 'center' | 'right'
    color?: string
  } = {}): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign,
    color,
  }),

  title3: ({
    fontWeight = 500,
    fontSize = 18,
    textAlign = 'left',
    color = Color.black[900],
  }: {
    fontWeight?: keyof typeof SourGummyWithWeight
    fontSize?: number
    textAlign?: 'left' | 'center' | 'right'
    color?: string
  } = {}): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign,
    color,
  }),

  body: ({
    fontWeight = 400,
    fontSize = 16,
    textAlign = 'left',
    color = Color.black[900],
  }: {
    fontWeight?: keyof typeof SourGummyWithWeight
    fontSize?: number
    textAlign?: 'left' | 'center' | 'right'
    color?: string
  } = {}): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign,
    color,
  }),

  body2: ({
    fontWeight = 400,
    fontSize = 14,
    textAlign = 'left',
    color = Color.black[900],
  }: {
    fontWeight?: keyof typeof SourGummyWithWeight
    fontSize?: number
    textAlign?: 'left' | 'center' | 'right'
    color?: string
  } = {}): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign,
    color,
  }),

  callout: ({
    fontWeight = 300,
    fontSize = 16,
    textAlign = 'left',
    color = Color.black[900],
  }: {
    fontWeight?: keyof typeof SourGummyWithWeight
    fontSize?: number
    textAlign?: 'left' | 'center' | 'right'
    color?: string
  } = {}): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign,
    color,
  }),

  callout2: ({
    fontWeight = 300,
    fontSize = 14,
    textAlign = 'left',
    color = Color.black[900],
  }: {
    fontWeight?: keyof typeof SourGummyWithWeight
    fontSize?: number
    textAlign?: 'left' | 'center' | 'right'
    color?: string
  } = {}): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign,
    color,
  }),

  link: ({
    fontWeight = 300,
    fontSize = 14,
    textAlign = 'left',
    color = Color.black[900],
  }: {
    fontWeight?: keyof typeof SourGummyWithWeight
    fontSize?: number
    textAlign?: 'left' | 'center' | 'right'
    color?: string
  } = {}): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign,
    color,
  }),

  link2: ({
    fontWeight = 300,
    fontSize = 12,
    textAlign = 'left',
    color = Color.black[900],
  }: {
    fontWeight?: keyof typeof SourGummyWithWeight
    fontSize?: number
    textAlign?: 'left' | 'center' | 'right'
    color?: string
  } = {}): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign,
    color,
  }),

  subhead: ({
    fontWeight = 400,
    fontSize = 12,
    textAlign = 'left',
    color = Color.black[900],
  }: {
    fontWeight?: keyof typeof SourGummyWithWeight
    fontSize?: number
    textAlign?: 'left' | 'center' | 'right'
    color?: string
  } = {}): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign,
    color,
  }),

  footnote: ({
    fontWeight = 400,
    fontSize = 12,
    textAlign = 'left',
    color = Color.black[900],
  }: {
    fontWeight?: keyof typeof SourGummyWithWeight
    fontSize?: number
    textAlign?: 'left' | 'center' | 'right'
    color?: string
  } = {}): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign,
    color,
  }),

  caption1: ({
    fontWeight = 300,
    fontSize = 11,
    textAlign = 'left',
    color = Color.black[900],
  }: {
    fontWeight?: keyof typeof SourGummyWithWeight
    fontSize?: number
    textAlign?: 'left' | 'center' | 'right'
    color?: string
  } = {}): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign,
    color,
  }),

  caption2: ({
    fontWeight = 300,
    fontSize = 10,
    textAlign = 'left',
    color = Color.black[900],
  }: {
    fontWeight?: keyof typeof SourGummyWithWeight
    fontSize?: number
    textAlign?: 'left' | 'center' | 'right'
    color?: string
  } = {}): TextStyle => ({
    fontFamily: SourGummyWithWeight[fontWeight],
    fontSize,
    textAlign,
    color,
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
  card: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addFloatingButton: {
    position: 'absolute',
    right: 20,
    backgroundColor: Color.brand1[700],
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  } as ViewStyle,
}

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    backgroundColor: Color.brand1[200],
  },
}

export { LabelStyle, LightTheme, GeneralStyle, HomeTabsHeight }
