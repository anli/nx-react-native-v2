import React, { FC, useState } from 'react'
import Auth0 from 'react-native-auth0'
import Config from 'react-native-config'
import { AuthContext } from './auth-context'

const refreshToken = Config.E2E_REFRESH_TOKEN

interface AuthProviderProps {
  client: Auth0
}

const scope = 'openid profile email offline_access'

export const AuthProvider: FC<AuthProviderProps> = ({ client, children }) => {
  const [idToken, setIdToken] = useState<string | undefined>(undefined)
  const [user, setUser] = useState<{ email: string } | undefined>(undefined)

  const login = async (): Promise<void> => {
    const authInfo = await client.auth.refreshToken({
      refreshToken: refreshToken,
      scope
    })
    const userInfo = await client.auth.userInfo({
      token: authInfo.accessToken
    })
    setIdToken(authInfo.idToken)
    setUser({ email: userInfo.email })
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
