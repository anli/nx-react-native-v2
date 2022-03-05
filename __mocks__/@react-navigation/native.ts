const mockNavigation = jest.requireActual('@react-navigation/native')

module.exports = {
  ...mockNavigation
  // useNavigation: () => ({
  //   ...mockNavigation.useNavigation(),
  //   goBack: jest.fn(),
  //   canGoBack: jest.fn().mockReturnValue(true)
  // })
}
