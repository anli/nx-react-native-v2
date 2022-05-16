import { getDeviceState } from '@nx-react-native/shared/push-notification'
import { useSuspense } from '@nx-react-native/shared/utils-suspense'
import { Maybe } from 'graphql/jsutils/Maybe'
import { useEffect, useState } from 'react'

interface Props {
  localPushUserId?: string
  isLocalActive: boolean
}

export const usePushNotification = (
  remotePushUserId?: Maybe<string>
): Props => {
  const [localPushUserId, setLocalPushUserId] = useState<string | undefined>(
    undefined
  )
  useSuspense(localPushUserId == null)

  useEffect(() => {
    const setup = async (): Promise<void> => {
      const deviceState = await getDeviceState()
      setLocalPushUserId(deviceState?.userId)
    }

    void setup()
  }, [])

  return {
    localPushUserId,
    isLocalActive: remotePushUserId === (localPushUserId ?? 'UNKNOWN')
  }
}
