import faker from '@faker-js/faker'
import { startOfMonth, startOfWeek } from 'date-fns'
import { DocumentNode } from 'graphql'
import {
  HabitViewScreenDocument,
  HabitViewScreenSubscription
} from './habit-view-screen.generated'

export const habitViewScreenMockData = {
  __typename: 'Habit' as const,
  id: faker.datatype.uuid(),
  name: faker.lorem.words(),
  habitActivities: [
    {
      __typename: 'HabitActivity' as const,
      date: startOfWeek(startOfMonth(new Date()), { weekStartsOn: 1 }),
      count: 1
    }
  ]
}

const habitViewScreenMockRequest = {
  query: HabitViewScreenDocument,
  variables: {
    id: habitViewScreenMockData.id
  }
}

export const habitViewScreenMockQuerySuccess: Array<{
  request: { query: DocumentNode }
  result: { data: HabitViewScreenSubscription }
}> = [
  {
    request: habitViewScreenMockRequest,
    result: {
      data: {
        __typename: 'Subscription',
        getHabit: habitViewScreenMockData
      }
    }
  }
]

export const habitViewScreenMockQueryError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request: habitViewScreenMockRequest,
    error: new Error('An error occurred')
  }
]
