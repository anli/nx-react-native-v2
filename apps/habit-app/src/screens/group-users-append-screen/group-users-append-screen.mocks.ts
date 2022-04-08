import faker from '@faker-js/faker'
import { DocumentNode } from 'graphql'
import {
  SetAdminUserDocument,
  SetAdminUserMutation
} from './group-users-append-screen.generated'

export const groupUsersAppendScreenData = {
  id: faker.datatype.uuid(),
  email: faker.internet.email()
}

const setAdminUserRequest = {
  query: SetAdminUserDocument,
  variables: {
    id: groupUsersAppendScreenData.id,
    email: groupUsersAppendScreenData.email
  }
}

export const setAdminUserMutationMockSuccess: Array<{
  request: { query: DocumentNode }
  result: { data: SetAdminUserMutation }
}> = [
  {
    request: setAdminUserRequest,
    result: {
      data: {
        __typename: 'Mutation',
        updateGroup: { __typename: 'UpdateGroupPayload', numUids: 1 }
      }
    }
  }
]

export const setAdminUserMutationMockError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request: setAdminUserRequest,
    error: new Error('An error occurred')
  }
]

export const setAdminUserMutationMockSuccessNull: Array<{
  request: { query: DocumentNode }
  result: { data: SetAdminUserMutation }
}> = [
  {
    request: setAdminUserRequest,
    result: {
      data: {
        __typename: 'Mutation',
        updateGroup: null
      }
    }
  }
]
