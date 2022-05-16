import '@testing-library/jest-native/extend-expect'

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

// https://github.com/callstack/react-native-testing-library/issues/329
jest.mock('react-native/Libraries/Components/Switch/Switch', () => {
  const mockComponent = require('react-native/jest/mockComponent')
  return {
    default: mockComponent('react-native/Libraries/Components/Switch/Switch')
  }
})
