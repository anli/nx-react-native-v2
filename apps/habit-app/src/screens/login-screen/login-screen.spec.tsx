import { render } from '@nx-react-native/shared/utils-testing'
import reactNavigation from '@react-navigation/native'
import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { LoginScreen } from './login-screen'

describe('LoginScreen', () => {
  it('Then I should see Login Screen', () => {
    const { getByText } = render(<LoginScreen.Container />)

    expect(getByText('Login title')).toBeDefined()
    expect(getByText('Login subtitle')).toBeDefined()
    expect(getByText('Login')).toBeDefined()
  })

  it('When I login successfully, Then I should see Authenticated Screen', () => {
    const mockNavigate = jest.fn()
    jest.spyOn(reactNavigation, 'useNavigation').mockReturnValue({
      navigate: mockNavigate
    })
    const { getByText } = render(<LoginScreen.Container />)

    fireEvent.press(getByText('Login'))

    expect(mockNavigate).toBeCalledTimes(1)
    expect(mockNavigate).toBeCalledWith('AppTabs')
  })
})
