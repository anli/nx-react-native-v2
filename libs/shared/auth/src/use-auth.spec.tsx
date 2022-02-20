import { renderHook } from '@testing-library/react-hooks'
import React, { FC } from 'react'
import Auth0 from 'react-native-auth0'
import { AuthProvider } from './auth-provider'
import { useAuth } from './use-auth'

const auth0 = new Auth0({
  domain: 'AUTHENTICATION_DOMAIN',
  clientId: 'AUTHENTICATION_CLIENT_ID'
})

describe('useAuth', () => {
  it('Then I should not see user', () => {
    const wrapper: FC = ({ children }) => (
      <AuthProvider client={auth0}>{children}</AuthProvider>
    )
    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(result.current.user).toBeUndefined()
  })

  it('When I login successfully, Then I should see user', async () => {
    const wrapper: FC = ({ children }) => (
      <AuthProvider client={auth0}>{children}</AuthProvider>
    )
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper
    })

    result.current.login?.()

    await waitForNextUpdate()

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

    await waitForNextUpdate()

    result.current.logout?.()

    await waitForNextUpdate()

    expect(result.current.user).toBeUndefined()
  })
})
