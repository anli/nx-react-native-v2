const mockNavigation = jest.requireActual('@react-navigation/native')

module.exports = {
  ...mockNavigation,
  useNavigation: jest.fn().mockReturnValue({
    setOptions: jest.fn(),
    navigate: jest.fn(),
    canGoBack: jest.fn().mockReturnValue(true),
    goBack: jest.fn()
  })
}
