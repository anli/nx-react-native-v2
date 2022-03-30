import faker from '@faker-js/faker'
import { DocumentNode } from 'graphql'
import {
  GroupDeleteDocument,
  GroupDeleteMutation
} from './use-group-delete.generated'

faker.seed(0)
export const useGroupDeleteMockData = {
  id: faker.datatype.uuid(),
  name: faker.lorem.word()
}

const request = {
  query: GroupDeleteDocument,
  variables: {
    filter: {
      id: [useGroupDeleteMockData.id]
    }
  }
}

export const useGroupDeleteMockQuerySuccess: Array<{
  request: { query: DocumentNode }
  result: { data: GroupDeleteMutation }
}> = [
  {
    request,
    result: {
      data: {
        __typename: 'Mutation',
        deleteGroup: { __typename: 'DeleteGroupPayload', numUids: 1 }
      }
    }
  }
]

export const useGroupDeleteMockQueryError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request,
    error: new Error('An error occurred')
  }
]
