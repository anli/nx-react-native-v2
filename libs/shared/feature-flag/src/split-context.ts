import { createContext } from 'react'

export interface SplitContextProps {
  getTreatment: (flagName: string) => string
}

export const SplitContext = createContext<SplitContextProps | null>(null)
