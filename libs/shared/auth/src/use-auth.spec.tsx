import { renderHook } from '@testing-library/react-hooks'
import React, { FC } from 'react'
import Auth0 from 'react-native-auth0'
import * as Keychain from 'react-native-keychain'
import { AuthProvider } from './auth-provider'
import { useAuth } from './use-auth'

const auth0 = new Auth0({
  domain: 'AUTHENTICATION_DOMAIN',
  clientId: 'AUTHENTICATION_CLIENT_ID'
})

describe('useAuth', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('Then I should not see user', () => {
    const wrapper: FC = ({ children }) => (
      <AuthProvider client={auth0}>{children}</AuthProvider>
    )
    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(result.current.user).toBeUndefined()
  })

  it('When I login successfully, Then I should see user, And I should save refresh token', async () => {
    const spy = jest.spyOn(Keychain, 'setGenericPassword')
    const wrapper: FC = ({ children }) => (
      <AuthProvider client={auth0}>{children}</AuthProvider>
    )
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper
    })

    result.current.login?.()

    expect(result.current.user).toBeUndefined()

    await waitForNextUpdate()

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('DEFAULT', 'REFRESH_TOKEN')
    expect(result.current.user).toEqual({ email: 'user@email.com' })
  })

  it('When I logout successfully, Then I should not see user', async () => {
    const wrapper: FC = ({ children }) => (
      <AuthProvider client={auth0}>{children}</AuthProvider>
    )
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper
    })

    result.current.login?.()
    expect(result.current.user).toBeUndefined()

    await waitForNextUpdate()

    result.current.logout?.()

    await waitForNextUpdate()

    expect(result.current.user).toBeUndefined()
  })

  it('When I have refresh token saved, Then I should see user, And I should see idToken', async () => {
    jest
      .spyOn(Keychain, 'getGenericPassword')
      .mockResolvedValueOnce({
        username: 'DEFAULT',
        password: 'REFRESH_TOKEN',
        service: 'SERVICE',
        storage: 'STORAGE'
      })
      .mockResolvedValue(false)
    const wrapper: FC = ({ children }) => (
      <AuthProvider client={auth0}>{children}</AuthProvider>
    )
    const { result, waitFor } = renderHook(() => useAuth(), {
      wrapper
    })

    await waitFor(() =>
      expect(result.current.user).toEqual({ email: 'user@email.com' })
    )

    expect(result.current.idToken).toEqual('ID_TOKEN')
  })
})
