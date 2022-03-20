import faker from '@faker-js/faker'
import { DocumentNode } from 'graphql'
import {
  HabitUpdateDocument,
  HabitUpdateMutation
} from './use-habit-update.generated'

faker.seed(0)
export const useHabitUpdateMockData = {
  id: faker.datatype.uuid(),
  name: faker.lorem.word(),
  user: { email: faker.internet.email() }
}

const request = {
  query: HabitUpdateDocument,
  variables: {
    input: {
      filter: { id: [useHabitUpdateMockData.id] },
      set: { name: useHabitUpdateMockData.name }
    }
  }
}

export const useHabitUpdateMockQuerySuccess: Array<{
  request: { query: DocumentNode }
  result: { data: HabitUpdateMutation }
}> = [
  {
    request,
    result: {
      data: {
        __typename: 'Mutation',
        updateHabit: { __typename: 'UpdateHabitPayload', numUids: 1 }
      }
    }
  }
]

export const useHabitUpdateMockQueryError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request,
    error: new Error('An error occurred')
  }
]
