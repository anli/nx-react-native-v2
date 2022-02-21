import { useContext } from 'react'
import { AuthContext, AuthContextProps } from './auth-context'

export const useAuth = (): AuthContextProps => {
  return useContext(AuthContext)
}
