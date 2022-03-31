import faker from '@faker-js/faker'
import { DocumentNode } from 'graphql'
import {
  GroupUpdateDocument,
  GroupUpdateMutation
} from './use-group-update.generated'

faker.seed(0)
export const useGroupUpdateMockData = {
  id: faker.datatype.uuid(),
  name: faker.lorem.word(),
  adminUsers: [{ email: faker.internet.email() }]
}

const request = {
  query: GroupUpdateDocument,
  variables: {
    input: {
      filter: { id: [useGroupUpdateMockData.id] },
      set: {
        name: useGroupUpdateMockData.name,
        adminUsers: useGroupUpdateMockData.adminUsers
      }
    }
  }
}

export const useGroupUpdateMockQuerySuccess: Array<{
  request: { query: DocumentNode }
  result: { data: GroupUpdateMutation }
}> = [
  {
    request,
    result: {
      data: {
        __typename: 'Mutation',
        updateGroup: { __typename: 'UpdateGroupPayload', numUids: 1 }
      }
    }
  }
]

export const useGroupUpdateMockQueryError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request,
    error: new Error('An error occurred')
  }
]
