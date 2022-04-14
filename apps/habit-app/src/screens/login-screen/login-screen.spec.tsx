import * as SharedAuth from '@nx-react-native/shared/auth'
import { render } from '@nx-react-native/shared/utils-testing'
import { fireEvent, waitFor } from '@testing-library/react-native'
import React from 'react'
import { Alert } from 'react-native'
import { LoginScreen } from './login-screen'

describe('LoginScreen', () => {
  afterAll(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  it('Then I should see Login Screen', () => {
    const { getByText } = render(<LoginScreen.Container />)

    expect(getByText('title')).toBeDefined()
    expect(getByText('subtitle')).toBeDefined()
    expect(getByText('buttonTitle')).toBeDefined()
  })

  it('When I login successfully, Then I should see Authenticated Screen', () => {
    const mockLogin = jest.fn()
    jest.spyOn(SharedAuth, 'useAuth').mockReturnValue({ login: mockLogin })
    const { getByText } = render(<LoginScreen.Container />)

    fireEvent.press(getByText('buttonTitle'))

    expect(mockLogin).toBeCalledTimes(1)
  })

  it('When I login with error, Then I should see Error Alert', async () => {
    jest.spyOn(Alert, 'alert')
    const mockLogin = jest.fn().mockImplementation(() => {
      throw new Error('An error occurred')
    })
    jest.spyOn(SharedAuth, 'useAuth').mockReturnValue({ login: mockLogin })
    const { getByText } = render(<LoginScreen.Container />)

    fireEvent.press(getByText('buttonTitle'))

    expect(mockLogin).toBeCalledTimes(1)

    await waitFor(() => expect(Alert.alert).toBeCalledTimes(1))
    expect(Alert.alert).toHaveBeenCalledWith('errorTitle', 'An error occurred')
  })
})
