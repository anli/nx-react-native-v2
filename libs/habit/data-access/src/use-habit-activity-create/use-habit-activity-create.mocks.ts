import { addDays, formatISO, startOfToday, startOfWeek } from 'date-fns'
import { DocumentNode } from 'graphql'
import { useHabitsMockData } from '../use-habits'
import {
  HabitActivityCreateDocument,
  HabitActivityCreateMutation
} from './use-habit-activity-create.generated'

export const useHabitActivityCreateMockData = {
  count: 1,
  date: formatISO(
    addDays(startOfWeek(startOfToday(), { weekStartsOn: 1 }), +1)
  ),
  habit: { id: useHabitsMockData.find(Boolean)?.id }
}

const request = {
  query: HabitActivityCreateDocument,
  variables: {
    input: {
      ...useHabitActivityCreateMockData
    }
  }
}

export const useHabitActivityCreateMockQuerySuccess: Array<{
  request: { query: DocumentNode }
  result: { data: HabitActivityCreateMutation }
}> = [
  {
    request,
    result: {
      data: {
        __typename: 'Mutation',
        addHabitActivity: { __typename: 'AddHabitActivityPayload', numUids: 1 }
      }
    }
  }
]

export const useHabitActivityCreateMockQueryError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request,
    error: new Error('An error occurred')
  }
]
