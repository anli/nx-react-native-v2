import { render as testingRender } from '@nx-react-native/shared/utils-testing'
import { render } from '@testing-library/react-native'
import React from 'react'
import { App, AppTabs } from './app'

describe('App', () => {
  it('Then I should see Login Screen', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId('LoginScreen')).toBeDefined()
  })

  it('Then I should see App Tabs', () => {
    const { getByTestId } = testingRender(<AppTabs />)
    expect(getByTestId('HomeScreen')).toBeDefined()
  })
})
