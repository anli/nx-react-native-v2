import React, { FC, useCallback, useEffect, useState } from 'react'
import Auth0 from 'react-native-auth0'
import * as Keychain from 'react-native-keychain'
import { AuthContext } from './auth-context'

interface AuthProviderProps {
  client: Auth0
}

const scope = 'openid profile email offline_access'

export const AuthProvider: FC<AuthProviderProps> = ({ client, children }) => {
  const [idToken, setIdToken] = useState<string | undefined>(undefined)
  const [user, setUser] = useState<{ email: string } | undefined | null>(
    undefined
  )

  const reLogin = useCallback(async (): Promise<void> => {
    const credentials = await Keychain.getGenericPassword()

    if (credentials !== false) {
      const refreshToken = credentials.password

      const { idToken: _idToken, accessToken } = await client.auth.refreshToken(
        { refreshToken }
      )

      const userInfo = await client.auth.userInfo({
        token: accessToken
      })

      setIdToken(_idToken)
      setUser({ email: userInfo.email })
    } else {
      setUser(null)
    }
  }, [client.auth])

  useEffect(() => {
    void reLogin()
  }, [client.auth, reLogin])

  const login = async (): Promise<void> => {
    try {
      const {
        idToken: _idToken,
        accessToken,
        refreshToken
      } = await client.webAuth.authorize({ scope })
      refreshToken != null &&
        (await Keychain.setGenericPassword('DEFAULT', refreshToken))

      const userInfo = await client.auth.userInfo({
        token: accessToken
      })

      setIdToken(_idToken)
      setUser({ email: userInfo.email })
    } catch (error) {
      /* istanbul ignore next */
      const formattedError = error as {
        error?: string
        error_description?: string
      }

      /* istanbul ignore next */
      if (formattedError?.error === 'a0.session.user_cancelled') {
        return
      }

      /* istanbul ignore next */
      throw new Error(formattedError.error_description)
    }
  }

  const logout = async (clear = true): Promise<void> => {
    clear && (await client.webAuth.clearSession())
    clear && (await Keychain.resetGenericPassword())
    setIdToken(undefined)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        reLogin,
        idToken,
        user
      }}>
      {children}
    </AuthContext.Provider>
  )
}
