import { createContext } from 'react'

export interface AuthContextProps {
  login?: () => void
  logout?: () => void
  idToken?: string
  user?: { email: string }
}

export const AuthContext = createContext<AuthContextProps>({})
