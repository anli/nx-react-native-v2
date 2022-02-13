import { render } from '@nx-react-native/shared/utils-testing'
import React from 'react'
import { HomeScreen } from './home-screen'

describe('HomeScreen', () => {
  it('Then I should see Home Screen', () => {
    const { getByText } = render(<HomeScreen.Container />)

    expect(getByText('Welcome')).toBeDefined()
  })
})
