module.exports = {
  displayName: 'habit-app',
  preset: '../../jest.preset',
  setupFilesAfterEnv: [
    '<rootDir>/../../jest.setup.ts',
    '<rootDir>/../../node_modules/react-native-gesture-handler/jestSetup.js'
  ],
  roots: ['../../__mocks__', '<rootDir>']
}
