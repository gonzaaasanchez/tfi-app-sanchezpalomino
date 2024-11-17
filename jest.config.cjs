module.exports = {
  preset: 'jest-expo',
  setupFiles: ['./jest.setup.cjs'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/app/',
    '^@packages/(.*)$': '<rootDir>/packages/',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)',
  ],
  collectCoverage: true,
}
