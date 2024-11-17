require('reflect-metadata')

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}))

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}))

jest.mock('@app/common', () => ({
  setAuthToken: jest.fn(),
  useInjection: jest.fn(),
  useI18n: () => ({ t: (key) => key }),
}))
