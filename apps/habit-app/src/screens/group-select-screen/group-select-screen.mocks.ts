import faker from '@faker-js/faker'
import { DocumentNode } from 'graphql'
import { GroupsDocument, GroupsQuery } from './group-select-screen.generated'

faker.seed()
const groups = Array.from({ length: 1 }, () => ({
  __typename: 'Group' as const,
  id: faker.datatype.uuid(),
  name: faker.lorem.word()
}))

export const groupSelectScreenData = {
  groups
}

const groupSelectScreenQueryRequest = {
  query: GroupsDocument,
  variables: {}
}

export const groupSelectScreenQueryMockSuccess: Array<{
  request: { query: DocumentNode }
  result: { data: GroupsQuery }
}> = [
  {
    request: groupSelectScreenQueryRequest,
    result: {
      data: {
        __typename: 'Query',
        queryGroup: groupSelectScreenData.groups
      }
    }
  }
]

export const groupSelectScreenQueryMockError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request: groupSelectScreenQueryRequest,
    error: new Error('An error occurred')
  }
]
