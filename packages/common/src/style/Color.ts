const Color = {
  brand1: {
    50: '#f1f2fc',
    100: '#e6e6f9',
    200: '#d2d2f3',
    300: '#b8b7ea',
    400: '#a099e0',
    500: '#8f80d4',
    600: '#7f66c5',
    700: '#6750a4',
    800: '#59478c',
    900: '#4b3f70',
  },
  brand2: {
    50: '#fcf6f0',
    100: '#f9eadb',
    200: '#f3d6bb',
    300: '#eab587',
    400: '#e08e57',
    500: '#d97036',
    600: '#cb592b',
    700: '#a84526',
    800: '#873925',
    900: '#6d3021',
  },
  black: {
    50: '#f9f9f9',
    100: '#f2f2f2',
    200: '#e6e6e6',
    300: '#cccccc',
    400: '#999999',
    500: '#666666',
    600: '#4d4d4d',
    700: '#333333',
    800: '#1a1a1a',
    900: '#000000',
  },
  green: {
    200: '#bffab8',
    500: '#26C318',
    700: '#18860f',
  },
  orange: {
    200: '#fce38b',
    500: '#F1950B',
    700: '#b34e0a',
  },
  red: {
    200: '#fbcfe9',
    500: '#ef5da8',
    700: '#bf1760',
  },
  mainBackground: '#f9eadb',
}

const StateColor = {
  error: {
    default: Color.red[500],
    disabled: Color.red[200],
    focused: Color.red[700],
  },
  success: {
    default: Color.green[500],
    disabled: Color.green[200],
    focused: Color.green[700],
  },
  warning: {
    default: Color.orange[500],
    disabled: Color.orange[200],
    focused: Color.orange[700],
  },
}

export { Color, StateColor }
