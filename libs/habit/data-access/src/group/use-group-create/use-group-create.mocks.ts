import faker from '@faker-js/faker'
import { DocumentNode } from 'graphql'
import {
  GroupCreateDocument,
  GroupCreateMutation
} from './use-group-create.generated'

faker.seed(0)
export const useGroupCreateMockData = {
  name: faker.lorem.word(),
  adminUsers: [{ email: faker.internet.email() }]
}

const request = {
  query: GroupCreateDocument,
  variables: {
    input: {
      ...useGroupCreateMockData
    }
  }
}

export const useGroupCreateMockQuerySuccess: Array<{
  request: { query: DocumentNode }
  result: { data: GroupCreateMutation }
}> = [
  {
    request,
    result: {
      data: {
        __typename: 'Mutation',
        addGroup: { __typename: 'AddGroupPayload', numUids: 1 }
      }
    }
  }
]

export const useGroupCreateMockQueryError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request,
    error: new Error('An error occurred')
  }
]
