import { MockedProvider } from '@apollo/client/testing'
import * as SharedAuth from '@nx-react-native/shared/auth'
import { render } from '@nx-react-native/shared/utils-testing'
import {
  fireEvent,
  waitForElementToBeRemoved
} from '@testing-library/react-native'
import React from 'react'
import {
  useHabitsMockData,
  useHabitsMockQueryError,
  useHabitsMockQueryHasData
} from '../../data-access'
import { HabitsScreen } from './habits-screen'

describe('Given I am at Habits Screen', () => {
  it('When loaded, Then I should see Habits', async () => {
    const { getByTestId, getByText } = render(
      <MockedProvider mocks={useHabitsMockQueryHasData} addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    expect(getByText(useHabitsMockData[0].name)).toBeDefined()
  })

  it('When loading, Then I should see Habits Screen Skeleton', async () => {
    const { getByTestId, getByText } = render(
      <MockedProvider mocks={useHabitsMockQueryHasData} addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    expect(getByTestId('HabitsScreenSkeleton')).toBeDefined()

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    expect(getByText(useHabitsMockData[0].name)).toBeDefined()
  })

  it('When Error, Then I should see Habits Screen Error', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => null)
    const { getByTestId } = render(
      <MockedProvider addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    expect(getByTestId('HabitsScreenError')).toBeDefined()

    spy.mockRestore()
  })

  it('When Error And I press Retry, Then I should logout', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => null)
    const mockLogout = jest.fn()
    jest.spyOn(SharedAuth, 'useAuth').mockReturnValue({
      logout: mockLogout
    })

    const { getByTestId, findByTestId } = render(
      <MockedProvider mocks={useHabitsMockQueryError} addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    fireEvent.press(getByTestId('ErrorScreen.Button'))

    expect(mockLogout).toBeCalledTimes(1)

    expect(await findByTestId('HabitsScreenError'))

    spy.mockRestore()
  })
})
