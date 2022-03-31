import faker from '@faker-js/faker'
import { DocumentNode } from 'graphql'
import {
  GroupDocument,
  GroupNonSubscriptionDocument,
  GroupNonSubscriptionQuery,
  GroupSubscription
} from './use-group.generated'

faker.seed(0)
export const useGroupMockData = {
  __typename: 'Group' as const,
  id: faker.datatype.uuid(),
  name: faker.lorem.word(),
  adminUsers: [{ __typename: 'User' as const, email: faker.internet.email() }]
}

const request = {
  query: GroupDocument,
  variables: {
    id: useGroupMockData.id
  }
}

const nonSubscriptionRequest = {
  query: GroupNonSubscriptionDocument,
  variables: {
    id: useGroupMockData.id
  }
}

export const useGroupMockQuerySuccess: Array<{
  request: { query: DocumentNode }
  result: { data: GroupSubscription }
}> = [
  {
    request,
    result: {
      data: { __typename: 'Subscription', getGroup: useGroupMockData }
    }
  }
]

export const useGroupNonSubscriptionMockQuerySuccess: Array<{
  request: { query: DocumentNode }
  result: { data: GroupNonSubscriptionQuery }
}> = [
  {
    request: nonSubscriptionRequest,
    result: {
      data: { __typename: 'Query', getGroup: useGroupMockData }
    }
  }
]

export const useGroupMockQueryError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request,
    error: new Error('An error occurred')
  }
]

export const useGroupNonSubscriptionMockQueryError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request: nonSubscriptionRequest,
    error: new Error('An error occurred')
  }
]
