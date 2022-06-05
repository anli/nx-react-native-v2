import { MockedProvider } from '@apollo/client/testing'
import { formatDateRange } from '@nx-react-native/shared/utils-date'
import { render } from '@nx-react-native/shared/utils-testing'
import { waitForElementToBeRemoved } from '@testing-library/react-native'
import {
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth
} from 'date-fns'
import React from 'react'
import { HabitViewScreen } from './habit-view-screen'
import {
  habitViewScreenMockData,
  habitViewScreenMockQueryError,
  habitViewScreenMockQuerySuccess
} from './habit-view-screen.mocks'

const defaultParams = {
  id: habitViewScreenMockData.id
}

const weekInterval = eachWeekOfInterval(
  {
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date())
  },
  { weekStartsOn: 1 }
)
const date = weekInterval[weekInterval.length - 1]
const dateRange = formatDateRange(
  new Date(date),
  endOfWeek(new Date(date), { weekStartsOn: 1 })
)

describe('Given I am at Habit View Screen', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  it('When loaded, Then I should see correct UI', async () => {
    const { getByTestId } = render(
      <MockedProvider
        mocks={habitViewScreenMockQuerySuccess}
        addTypename={false}>
        <HabitViewScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('HabitViewScreenSkeleton')
    )

    expect(getByTestId('SegmentedControl')).toBeDefined()
    expect(getByTestId('GraphTitle')).toHaveTextContent(dateRange)
  })

  it('When API returns Error, Then I should see error UI', async () => {
    jest.spyOn(console, 'error').mockImplementationOnce(() => null)
    const { getByTestId } = render(
      <MockedProvider mocks={habitViewScreenMockQueryError} addTypename={false}>
        <HabitViewScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('HabitViewScreenSkeleton')
    )

    expect(getByTestId('HabitViewScreenError')).toBeDefined()
  })
})
