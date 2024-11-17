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
  background: '#f3d6bb',
}

const StateColor = {
  primary: {
    default: Color.brand1[500],
    disabled: Color.brand1[400],
    focused: Color.brand1[700],
  },
  secondary: {
    default: Color.brand1[200],
    focused: Color.brand1[100],
    // stroke: {
    //   default: Color.neutralLight[500],
    //   focused: Color.neutralLight[300],
    // },
  },
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
