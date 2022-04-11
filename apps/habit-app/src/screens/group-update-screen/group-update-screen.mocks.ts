import faker from '@faker-js/faker'
import { DocumentNode } from 'graphql'
import {
  GroupUpdateScreenDocument,
  GroupUpdateScreenQuery,
  GroupUpdateScreenUpdateDocument,
  GroupUpdateScreenUpdateMutation
} from './group-update-screen.generated'

faker.seed(0)
export const groupUpdateScreenMockData = {
  __typename: 'Group' as const,
  id: faker.datatype.uuid(),
  name: faker.lorem.word()
}

const groupUpdateScreenRequest = {
  query: GroupUpdateScreenDocument,
  variables: {
    id: groupUpdateScreenMockData.id
  }
}

export const groupUpdateScreenQueryMockSuccess: Array<{
  request: { query: DocumentNode }
  result: { data: GroupUpdateScreenQuery }
}> = [
  {
    request: groupUpdateScreenRequest,
    result: {
      data: { __typename: 'Query', getGroup: groupUpdateScreenMockData }
    }
  }
]

export const groupUpdateScreenQueryMockError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request: groupUpdateScreenRequest,
    error: new Error('An error occurred')
  }
]

const groupUpdateScreenUpdateRequest = {
  query: GroupUpdateScreenUpdateDocument,
  variables: {
    input: {
      filter: { id: [groupUpdateScreenMockData.id] },
      set: {
        name: groupUpdateScreenMockData.name
      }
    }
  }
}

export const groupUpdateScreenUpdateMutationMockSuccess: Array<{
  request: { query: DocumentNode }
  result: { data: GroupUpdateScreenUpdateMutation }
}> = [
  {
    request: groupUpdateScreenUpdateRequest,
    result: {
      data: {
        __typename: 'Mutation',
        updateGroup: { __typename: 'UpdateGroupPayload', numUids: 1 }
      }
    }
  }
]

export const groupUpdateScreenUpdateMutationMockError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request: groupUpdateScreenUpdateRequest,
    error: new Error('An error occurred')
  }
]
