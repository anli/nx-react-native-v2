import '@splitsoftware/splitio-react-native'
import React, { FC, useEffect, useState } from 'react'
import { SplitContext } from './split-context'

interface SplitProviderProps {
  client: SplitIO.IClient
}

export const SplitProvider: FC<SplitProviderProps> = ({ client, children }) => {
  const [, setLoading] = useState(true)

  useEffect(() => {
    const handleReady = (): void => {
      setLoading(false)
    }

    client.on(client.Event.SDK_READY, handleReady)
  }, [client])

  const getTreatment = (flagName: string): string => {
    return client.getTreatment(flagName)
  }

  return (
    <SplitContext.Provider value={{ getTreatment }}>
      {children}
    </SplitContext.Provider>
  )
}
