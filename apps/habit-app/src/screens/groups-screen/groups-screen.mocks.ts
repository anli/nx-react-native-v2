import faker from '@faker-js/faker'
import { DocumentNode } from 'graphql'
import {
  GroupsScreenDocument,
  GroupsScreenSubscription
} from './groups-screen.generated'

const request = {
  query: GroupsScreenDocument
}

export const useGroupsScreenMockData = Array.from({ length: 3 }, (_, i) => {
  faker.seed(i)
  return {
    __typename: 'Group' as const,
    id: faker.datatype.uuid(),
    name: faker.lorem.word()
  }
})

export const useGroupsScreenMockQueryNoData: Array<{
  request: { query: DocumentNode }
  result: { data: GroupsScreenSubscription }
}> = [
  {
    request,
    result: {
      data: { __typename: 'Subscription', queryGroup: [] }
    }
  }
]

export const useGroupsScreenMockQueryHasData: Array<{
  request: { query: DocumentNode }
  result: { data: GroupsScreenSubscription }
}> = [
  {
    request,
    result: {
      data: { __typename: 'Subscription', queryGroup: useGroupsScreenMockData }
    }
  }
]

export const useGroupsScreenMockQueryError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request,
    error: new Error('An error occurred')
  }
]

export const useGroupsScreenMockQueryEmptyData: Array<{
  request: { query: DocumentNode }
  result: { data: GroupsScreenSubscription }
}> = [
  {
    request,
    result: {
      data: { __typename: 'Subscription', queryGroup: null }
    }
  }
]
