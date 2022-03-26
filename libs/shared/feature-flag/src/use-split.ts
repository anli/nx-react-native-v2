import { useContext } from 'react'
import { SplitContext, SplitContextProps } from './split-context'

export const useSplit = (): SplitContextProps => {
  const context = useContext(SplitContext)

  if (context === null) {
    throw new Error('useSplit must be used within a SplitProvider')
  }

  return context
}
