module.exports = {
  postNotification: jest.fn(),
  getDeviceState: jest.fn().mockResolvedValue({}),
  setExternalUserId: jest.fn(),
  removeExternalUserId: jest.fn(),
  promptForPushNotificationsWithUserResponse: jest.fn(),
  setLogLevel: jest.fn(),
  setAppId: jest.fn()
}
