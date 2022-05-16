import OneSignal from 'react-native-onesignal'

export const setExternalUserId = async (
  externalUserId?: string
): Promise<void> => {
  if (externalUserId != null) {
    OneSignal.setExternalUserId(externalUserId)
  } else {
    OneSignal.removeExternalUserId()
  }
}
