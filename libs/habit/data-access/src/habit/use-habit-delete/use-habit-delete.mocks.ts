import faker from '@faker-js/faker'
import { DocumentNode } from 'graphql'
import {
  HabitDeleteDocument,
  HabitDeleteMutation
} from './use-habit-delete.generated'

faker.seed(0)
export const useHabitDeleteMockData = {
  id: faker.datatype.uuid(),
  name: faker.lorem.word()
}

const request = {
  query: HabitDeleteDocument,
  variables: {
    filter: {
      id: [useHabitDeleteMockData.id]
    }
  }
}

export const useHabitDeleteMockQuerySuccess: Array<{
  request: { query: DocumentNode }
  result: { data: HabitDeleteMutation }
}> = [
  {
    request,
    result: {
      data: {
        __typename: 'Mutation',
        deleteHabit: { __typename: 'DeleteHabitPayload', numUids: 1 }
      }
    }
  }
]

export const useHabitDeleteMockQueryError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request,
    error: new Error('An error occurred')
  }
]
