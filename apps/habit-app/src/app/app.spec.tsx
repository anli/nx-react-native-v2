import * as SharedAuth from '@nx-react-native/shared/auth'
import { render } from '@testing-library/react-native'
import React from 'react'
import { App } from './app'

describe('App', () => {
  it('Then I should see Login Screen', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId('LoginScreen')).toBeDefined()
  })

  it('Then I should see App Tabs', () => {
    jest.spyOn(SharedAuth, 'useAuth').mockReturnValue({
      user: { email: 'user@email.com' }
    })
    const { getByTestId } = render(<App />)
    expect(getByTestId('HomeScreen')).toBeDefined()
  })
})
