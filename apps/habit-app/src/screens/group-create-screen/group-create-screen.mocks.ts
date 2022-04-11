import faker from '@faker-js/faker'
import { DocumentNode } from 'graphql'
import {
  GroupCreateScreenAddDocument,
  GroupCreateScreenAddMutation
} from './group-create-screen.generated'

faker.seed(0)
export const groupCreateScreenMockData = {
  name: faker.lorem.word(),
  adminUsers: [{ email: faker.internet.email() }]
}

const groupCreateScreenAddMutationRequest = {
  query: GroupCreateScreenAddDocument,
  variables: {
    input: {
      ...groupCreateScreenMockData
    }
  }
}

export const groupCreateScreenAddMutationMockSuccess: Array<{
  request: { query: DocumentNode }
  result: { data: GroupCreateScreenAddMutation }
}> = [
  {
    request: groupCreateScreenAddMutationRequest,
    result: {
      data: {
        __typename: 'Mutation',
        addGroup: { __typename: 'AddGroupPayload', numUids: 1 }
      }
    }
  }
]

export const groupCreateScreenAddMutationMockError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request: groupCreateScreenAddMutationRequest,
    error: new Error('An error occurred')
  }
]
