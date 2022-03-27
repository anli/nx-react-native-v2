import faker from '@faker-js/faker'
import { DocumentNode } from 'graphql'
import { GroupsDocument, GroupsSubscription } from './use-groups.generated'

const request = {
  query: GroupsDocument
}

export const useGroupsMockData = Array.from({ length: 3 }, (_, i) => {
  faker.seed(i)
  return {
    __typename: 'Group' as const,
    id: faker.datatype.uuid(),
    name: faker.lorem.word()
  }
})

export const useGroupsMockQueryNoData: Array<{
  request: { query: DocumentNode }
  result: { data: GroupsSubscription }
}> = [
  {
    request,
    result: {
      data: { __typename: 'Subscription', queryGroup: [] }
    }
  }
]

export const useGroupsMockQueryHasData: Array<{
  request: { query: DocumentNode }
  result: { data: GroupsSubscription }
}> = [
  {
    request,
    result: {
      data: { __typename: 'Subscription', queryGroup: useGroupsMockData }
    }
  }
]

export const useGroupsMockQueryError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request,
    error: new Error('An error occurred')
  }
]

export const useGroupsMockQueryEmptyData: Array<{
  request: { query: DocumentNode }
  result: { data: GroupsSubscription }
}> = [
  {
    request,
    result: {
      data: { __typename: 'Subscription', queryGroup: null }
    }
  }
]
