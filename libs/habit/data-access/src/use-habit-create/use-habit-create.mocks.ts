import faker from '@faker-js/faker'
import { DocumentNode } from 'graphql'
import {
  HabitCreateDocument,
  HabitCreateMutation
} from './use-habit-create.generated'

faker.seed(0)
export const useHabitCreateMockData = {
  name: faker.lorem.word(),
  user: { email: faker.internet.email() }
}

const request = {
  query: HabitCreateDocument,
  variables: {
    input: {
      ...useHabitCreateMockData
    }
  }
}

export const useHabitCreateMockQuerySuccess: Array<{
  request: { query: DocumentNode }
  result: { data: HabitCreateMutation }
}> = [
  {
    request,
    result: {
      data: {
        __typename: 'Mutation',
        addHabit: { __typename: 'AddHabitPayload', numUids: 1 }
      }
    }
  }
]

export const useHabitCreateMockQueryError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request,
    error: new Error('An error occurred')
  }
]
