import { StyleSheet } from 'react-native';
import { Color, StateColor } from './Color';
import { DefaultTheme } from '@react-navigation/native';

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
});

const ContainerStyle = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.brand1[700],
  },
  topBar: {
    top: 0,
    height: 125,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    paddingBottom: 20,
    paddingHorizontal: 22,
    backgroundColor: Color.brand1[200],
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  topBarCircleButton: {
    width: 42,
    height: 42,
    borderRadius: 100,
    // backgroundColor: StateColor.tertiary.negative.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitle: {
    height: 42, // same height as topBarCircleIcon
    justifyContent: 'center',
  },
  topBarCircleIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
});

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    backgroundColor: Color.brand1[200],
  },
};

export { LabelStyle, ContainerStyle, LightTheme };
