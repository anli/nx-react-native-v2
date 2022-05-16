import OneSignal, { DeviceState } from 'react-native-onesignal'

export const getDeviceState = async (): Promise<DeviceState | null> => {
  return await OneSignal.getDeviceState()
}
