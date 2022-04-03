import faker from '@faker-js/faker'
import { DocumentNode } from 'graphql'
import {
  GroupUsersScreenDocument,
  GroupUsersScreenSubscription,
  RemoveAdminUserDocument,
  RemoveAdminUserMutation
} from './group-users-screen.generated'

export const groupUsersScreenData = {
  __typename: 'Group' as const,
  id: faker.datatype.uuid(),
  name: faker.lorem.word(),
  adminUsers: [
    {
      __typename: 'User' as const,
      email: faker.internet.email(),
      id: faker.datatype.uuid()
    },
    {
      __typename: 'User' as const,
      email: faker.internet.email(),
      id: faker.datatype.uuid()
    }
  ]
}

const groupUsersScreenRequest = {
  query: GroupUsersScreenDocument,
  variables: {
    id: groupUsersScreenData.id
  }
}

export const groupUsersScreenSubscriptionMockSuccess: Array<{
  request: { query: DocumentNode }
  result: { data: GroupUsersScreenSubscription }
}> = [
  {
    request: groupUsersScreenRequest,
    result: {
      data: { __typename: 'Subscription', getGroup: groupUsersScreenData }
    }
  }
]

export const groupUsersScreenSubscriptionMockError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request: groupUsersScreenRequest,
    error: new Error('An error occurred')
  }
]

const removeAdminUserRequest = {
  query: RemoveAdminUserDocument,
  variables: {
    id: groupUsersScreenData.id,
    email: groupUsersScreenData.adminUsers[0].email
  }
}

export const removeAdminUserMutationMockSuccess: Array<{
  request: { query: DocumentNode }
  result: { data: RemoveAdminUserMutation }
}> = [
  {
    request: removeAdminUserRequest,
    result: {
      data: {
        __typename: 'Mutation',
        updateGroup: { __typename: 'UpdateGroupPayload', numUids: 1 }
      }
    }
  }
]

export const removeAdminUserMutationMockError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request: removeAdminUserRequest,
    error: new Error('An error occurred')
  }
]
