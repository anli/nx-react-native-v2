const splitio = jest.requireActual('@splitsoftware/splitio-react-native')

module.exports = {
  ...splitio,
  SplitFactory: () => {
    return {
      client: () => {
        return {
          on: jest.fn().mockImplementation((_, cb) => {
            cb()
          }),
          Event: { SDK_READY: 'SDK_READY' },
          getTreatment: jest.fn()
        }
      }
    }
  }
}
