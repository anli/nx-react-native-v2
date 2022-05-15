import React, { createContext, FC, useEffect } from 'react'
import OneSignal from 'react-native-onesignal'

export const PushNotificationContext = createContext(undefined)

interface PushNotificationProviderProps {
  externalUserId?: string
  onSetExternalUserId: (userId: string, externalUserId: string) => void
}

export const PushNotificationProvider: FC<PushNotificationProviderProps> = ({
  externalUserId,
  onSetExternalUserId,
  children
}) => {
  /* istanbul ignore next */
  useEffect(() => {
    const handleSetExternalUserId = async (
      _externalUserId: string
    ): Promise<void> => {
      const deviceState = await OneSignal.getDeviceState()
      if (deviceState?.userId != null) {
        onSetExternalUserId(deviceState.userId, _externalUserId)
      }
    }

    if (externalUserId != null) {
      void handleSetExternalUserId(externalUserId)
      OneSignal.setExternalUserId(externalUserId)
    } else {
      OneSignal.removeExternalUserId()
    }

    return () => {
      OneSignal.removeExternalUserId()
    }
  }, [externalUserId, onSetExternalUserId])

  return (
    <PushNotificationContext.Provider value={undefined}>
      {children}
    </PushNotificationContext.Provider>
  )
}
