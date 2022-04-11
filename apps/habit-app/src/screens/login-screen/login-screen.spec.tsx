import * as SharedAuth from '@nx-react-native/shared/auth'
import { render } from '@nx-react-native/shared/utils-testing'
import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { LoginScreen } from './login-screen'

describe('LoginScreen', () => {
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
})
