import React, { FC, useState } from 'react'
import Auth0 from 'react-native-auth0'
import { AuthContext } from './auth-context'

interface AuthProviderProps {
  client: Auth0
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [idToken, setIdToken] = useState<string | undefined>(undefined)
  const [user, setUser] = useState<{ email: string } | undefined>(undefined)

  const login = async (): Promise<void> => {
    setIdToken('ID_TOKEN')
    setUser({ email: 'USER@email.com' })
  }

  const logout = async (): Promise<void> => {
    setIdToken(undefined)
    setUser(undefined)
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        idToken,
        user
      }}>
      {children}
    </AuthContext.Provider>
  )
}
