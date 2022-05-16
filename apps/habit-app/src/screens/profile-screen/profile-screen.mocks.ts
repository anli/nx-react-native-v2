import faker from '@faker-js/faker'
import { DocumentNode } from 'graphql'
import {
  ProfileScreenAddUserDocument,
  ProfileScreenAddUserMutation,
  ProfileScreenAddUserMutationVariables,
  ProfileScreenDocument,
  ProfileScreenSubscription,
  ProfileScreenSubscriptionVariables,
  ProfileScreenUpdateUserDocument,
  ProfileScreenUpdateUserMutation,
  ProfileScreenUpdateUserMutationVariables
} from './profile-screen.generated'

export const useProfileScreenMockData = {
  email: faker.internet.email(),
  pushNotificationUserId: faker.datatype.uuid(),
  addPushNotificationUserId: faker.datatype.uuid()
}

export const useProfileScreenMockQuery: Array<{
  request: {
    query: DocumentNode
    variables: ProfileScreenSubscriptionVariables
  }
  result: { data: ProfileScreenSubscription }
}> = [
  {
    request: {
      query: ProfileScreenDocument,
      variables: {
        user: useProfileScreenMockData.email
      }
    },
    result: {
      data: {
        __typename: 'Subscription',
        getUser: {
          __typename: 'User' as const,
          pushNotificationUserId:
            useProfileScreenMockData.pushNotificationUserId
        }
      }
    }
  }
]

export const useProfileScreenUpdateUserMockSuccess: Array<{
  request: {
    query: DocumentNode
    variables: ProfileScreenUpdateUserMutationVariables
  }
  result: { data: ProfileScreenUpdateUserMutation }
}> = [
  {
    request: {
      query: ProfileScreenUpdateUserDocument,
      variables: {
        patch: {
          filter: {
            email: { eq: useProfileScreenMockData.email }
          },
          remove: {
            pushNotificationUserId: ''
          }
        }
      }
    },
    result: {
      data: {
        __typename: 'Mutation',
        updateUser: {
          __typename: 'UpdateUserPayload',
          numUids: 1
        }
      }
    }
  }
]

export const useProfileScreenAddUserMockSuccess: Array<{
  request: {
    query: DocumentNode
    variables: ProfileScreenAddUserMutationVariables
  }
  result: { data: ProfileScreenAddUserMutation }
}> = [
  {
    request: {
      query: ProfileScreenAddUserDocument,
      variables: {
        input: {
          email: useProfileScreenMockData.email,
          pushNotificationUserId:
            useProfileScreenMockData.addPushNotificationUserId
        }
      }
    },
    result: {
      data: {
        __typename: 'Mutation',
        addUser: {
          __typename: 'AddUserPayload',
          numUids: 1
        }
      }
    }
  }
]
