import faker from '@faker-js/faker'
import { DocumentNode } from 'graphql'
import {
  GroupViewScreenDeleteDocument,
  GroupViewScreenDeleteMutation,
  GroupViewScreenDocument,
  GroupViewScreenSubscription
} from './group-view-screen.generated'

faker.seed(0)
export const useGroupMockData = {
  __typename: 'Group' as const,
  id: faker.datatype.uuid(),
  name: faker.lorem.word(),
  adminUsers: [{ __typename: 'User' as const, email: faker.internet.email() }],
  adminUsersAggregate: {
    __typename: 'UserAggregateResult' as const,
    count: 1
  }
}

const groupViewScreenRequest = {
  query: GroupViewScreenDocument,
  variables: {
    id: useGroupMockData.id
  }
}

export const useGroupMockQuerySuccess: Array<{
  request: { query: DocumentNode }
  result: { data: GroupViewScreenSubscription }
}> = [
  {
    request: groupViewScreenRequest,
    result: {
      data: { __typename: 'Subscription', getGroup: useGroupMockData }
    }
  }
]

export const useGroupMockQueryError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request: groupViewScreenRequest,
    error: new Error('An error occurred')
  }
]

const groupViewScreenDeleteRequest = {
  query: GroupViewScreenDeleteDocument,
  variables: {
    filter: {
      id: [useGroupMockData.id]
    }
  }
}

export const useGroupDeleteMockQuerySuccess: Array<{
  request: { query: DocumentNode }
  result: { data: GroupViewScreenDeleteMutation }
}> = [
  {
    request: groupViewScreenDeleteRequest,
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
    request: groupViewScreenDeleteRequest,
    error: new Error('An error occurred')
  }
]
