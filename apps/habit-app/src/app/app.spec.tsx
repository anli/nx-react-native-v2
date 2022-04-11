import { MockedProvider } from '@apollo/client/testing'
import * as SharedAuth from '@nx-react-native/shared/auth'
import * as FeatureFlag from '@nx-react-native/shared/feature-flag'
import {
  render,
  waitForElementToBeRemoved
} from '@testing-library/react-native'
import React from 'react'
import { useHabitsMockQueryHasData } from './../screens/habits-screen/habits-screen.mocks'
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

  it('When feature flag Group is on, Then I should see Group Tab', async () => {
    jest.spyOn(SharedAuth, 'useAuth').mockReturnValue({
      user: { email: 'user@email.com' }
    })
    jest.spyOn(FeatureFlag, 'useSplit').mockReturnValue({
      getTreatment: jest.fn().mockReturnValue('on')
    })
    const { getByTestId } = render(
      <MockedProvider mocks={useHabitsMockQueryHasData} addTypename={false}>
        <App />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    expect(getByTestId('GroupsTabButton')).toBeDefined()
  })

  it('When feature flag Group is off, Then I should not see Group Tab', async () => {
    jest.spyOn(SharedAuth, 'useAuth').mockReturnValue({
      user: { email: 'user@email.com' }
    })
    jest.spyOn(FeatureFlag, 'useSplit').mockReturnValue({
      getTreatment: jest.fn().mockReturnValue('off')
    })
    const { queryByTestId, getByTestId } = render(
      <MockedProvider mocks={useHabitsMockQueryHasData} addTypename={false}>
        <App />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    expect(queryByTestId('GroupsTabButton')).toBeNull()
  })
})
