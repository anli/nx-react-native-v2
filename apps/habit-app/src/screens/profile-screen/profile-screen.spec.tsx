import * as SharedAuth from '@nx-react-native/shared/auth'
import { render } from '@nx-react-native/shared/utils-testing'
import { fireEvent, waitFor } from '@testing-library/react-native'
import React from 'react'
import ReactI18next from 'react-i18next'
import { ProfileScreen } from './profile-screen'

describe('Given I am at Profile Screen', () => {
  afterEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  it('When loaded, Then I should see Logout Button', async () => {
    const { getByA11yLabel } = render(<ProfileScreen.Container />)

    expect(getByA11yLabel('logoutAccessibilityLabel')).toBeDefined()
  })

  it('When I press Logout, Then I should be logout', async () => {
    const mockLogout = jest.fn()
    jest.spyOn(SharedAuth, 'useAuth').mockImplementation(() => ({
      logout: mockLogout
    }))

    const { getByA11yLabel } = render(<ProfileScreen.Container />)

    fireEvent.press(getByA11yLabel('logoutAccessibilityLabel'))

    await waitFor(() => expect(mockLogout).toBeCalledTimes(1))
  })

  it('When initial load, Then I should see Skeleton Screen', () => {
    jest
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .spyOn<any, 'useTranslation'>(ReactI18next, 'useTranslation')
      .mockImplementationOnce(() => {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw new Promise(() => null)
      })
    const { getByTestId } = render(<ProfileScreen.Container />)

    expect(getByTestId('ProfileScreenSkeleton')).toBeDefined()
  })

  it('When Error, Then I should see Error Screen', () => {
    jest.spyOn(console, 'error').mockImplementation(() => null)
    jest
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .spyOn<any, 'useTranslation'>(ReactI18next, 'useTranslation')
      .mockImplementationOnce(() => {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw new Error()
      })
    const { getByTestId } = render(<ProfileScreen.Container />)

    expect(getByTestId('ProfileScreenError')).toBeDefined()
  })

  it('When Error And I press Retry, Then I should logout', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => null)
    const mockLogout = jest.fn()
    jest.spyOn(SharedAuth, 'useAuth').mockReturnValue({
      logout: mockLogout
    })
    jest
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .spyOn<any, 'useTranslation'>(ReactI18next, 'useTranslation')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const { getByTestId } = render(<ProfileScreen.Container />)

    fireEvent.press(getByTestId('ErrorScreen.Button'))

    expect(mockLogout).toBeCalledTimes(1)
  })
})
