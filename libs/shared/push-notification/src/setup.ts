import OneSignal from 'react-native-onesignal'

/* istanbul ignore next */
export const setup = (appId: string): void => {
  OneSignal.setLogLevel(0, 0)
  OneSignal.setAppId(appId)

  OneSignal.promptForPushNotificationsWithUserResponse(() => null)
}
