import faker from '@faker-js/faker'
import { DocumentNode } from 'graphql'
import { GroupDocument, GroupSubscription } from './use-group.generated'

faker.seed(0)
export const useGroupMockData = {
  __typename: 'Group' as const,
  id: faker.datatype.uuid(),
  name: faker.lorem.word()
}

const request = {
  query: GroupDocument,
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

export const useGroupMockQueryError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request,
    error: new Error('An error occurred')
  }
]
