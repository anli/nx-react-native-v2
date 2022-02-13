import { render } from '@nx-react-native/shared/utils-testing'
import reactNavigation from '@react-navigation/native'
import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import reactI18next from 'react-i18next'
import { LoginScreen } from './login-screen'

describe('LoginScreen', () => {
  it('Then I should see Login Screen', () => {
    const { getByText } = render(<LoginScreen.Container />)

    expect(getByText('title')).toBeDefined()
    expect(getByText('subtitle')).toBeDefined()
    expect(getByText('buttonTitle')).toBeDefined()
  })

  it('When I login successfully, Then I should see Authenticated Screen', () => {
    const mockNavigate = jest.fn()
    jest.spyOn(reactNavigation, 'useNavigation').mockReturnValue({
      navigate: mockNavigate
    })
    const { getByText } = render(<LoginScreen.Container />)

    fireEvent.press(getByText('buttonTitle'))

    expect(mockNavigate).toBeCalledTimes(1)
    expect(mockNavigate).toBeCalledWith('AppTabs')
  })

  it('When initial load, Then I should see Skeleton Screen', () => {
    jest
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .spyOn<any, 'useTranslation'>(reactI18next, 'useTranslation')
      .mockImplementation(() => {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw new Promise(() => null)
      })
    const { getByTestId } = render(<LoginScreen.Container />)

    expect(getByTestId('LoginScreenSkeleton')).toBeDefined()
  })
})
