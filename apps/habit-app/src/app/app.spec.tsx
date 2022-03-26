import { MockedProvider } from '@apollo/client/testing'
import { useHabitsMockQueryHasData } from '@nx-react-native/habit/data-access'
import * as SharedAuth from '@nx-react-native/shared/auth'
import {
  render,
  waitForElementToBeRemoved
} from '@testing-library/react-native'
import React from 'react'
import { App } from './app'

describe('App', () => {
  it('Then I should see Login Screen', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId('LoginScreen')).toBeDefined()
  })

  it('Then I should see App Tabs', async () => {
    jest.spyOn(SharedAuth, 'useAuth').mockReturnValue({
      user: { email: 'user@email.com' }
    })
    const { getByTestId } = render(
      <MockedProvider mocks={useHabitsMockQueryHasData} addTypename={false}>
        <App />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    expect(getByTestId('HabitsScreen')).toBeDefined()
  })
})
