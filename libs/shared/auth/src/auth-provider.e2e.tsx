import React, { FC, useState } from 'react'
import { Platform } from 'react-native'
import Auth0 from 'react-native-auth0'
import Config from 'react-native-config'
import { AuthContext } from './auth-context'

const refreshToken = Platform.select({ default: Config.E2E_REFRESH_TOKEN_IOS, android: Config.E2E_REFRESH_TOKEN_ANDROID })

interface AuthProviderProps {
  client: Auth0
}

const scope = 'openid profile email offline_access'

export const AuthProvider: FC<AuthProviderProps> = ({ client, children }) => {
  const [idToken, setIdToken] = useState<string | undefined>(undefined)
  const [user, setUser] = useState<{ email: string } | null>(null)

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
    setUser(null)
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
