import * as Types from '../../graphql-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ProfileScreenSubscriptionVariables = Types.Exact<{
  user?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type ProfileScreenSubscription = { __typename: 'Subscription', getUser?: { __typename: 'User', pushNotificationUserId?: string | null } | null };

export type ProfileScreenAddUserMutationVariables = Types.Exact<{
  input: Array<Types.AddUserInput> | Types.AddUserInput;
}>;


export type ProfileScreenAddUserMutation = { __typename: 'Mutation', addUser?: { __typename: 'AddUserPayload', numUids?: number | null } | null };

export type ProfileScreenUpdateUserMutationVariables = Types.Exact<{
  patch: Types.UpdateUserInput;
}>;


export type ProfileScreenUpdateUserMutation = { __typename: 'Mutation', updateUser?: { __typename: 'UpdateUserPayload', numUids?: number | null } | null };


export const ProfileScreenDocument = gql`
    subscription ProfileScreen($user: String) {
  getUser(email: $user) {
    pushNotificationUserId
  }
}
    `;

/**
 * __useProfileScreenSubscription__
 *
 * To run a query within a React component, call `useProfileScreenSubscription` and pass it any options that fit your needs.
 * When your component renders, `useProfileScreenSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileScreenSubscription({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useProfileScreenSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ProfileScreenSubscription, ProfileScreenSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ProfileScreenSubscription, ProfileScreenSubscriptionVariables>(ProfileScreenDocument, options);
      }
export type ProfileScreenSubscriptionHookResult = ReturnType<typeof useProfileScreenSubscription>;
export type ProfileScreenSubscriptionResult = Apollo.SubscriptionResult<ProfileScreenSubscription>;
export const ProfileScreenAddUserDocument = gql`
    mutation ProfileScreenAddUser($input: [AddUserInput!]!) {
  addUser(input: $input, upsert: true) {
    numUids
  }
}
    `;
export type ProfileScreenAddUserMutationFn = Apollo.MutationFunction<ProfileScreenAddUserMutation, ProfileScreenAddUserMutationVariables>;

/**
 * __useProfileScreenAddUserMutation__
 *
 * To run a mutation, you first call `useProfileScreenAddUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProfileScreenAddUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [profileScreenAddUserMutation, { data, loading, error }] = useProfileScreenAddUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProfileScreenAddUserMutation(baseOptions?: Apollo.MutationHookOptions<ProfileScreenAddUserMutation, ProfileScreenAddUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProfileScreenAddUserMutation, ProfileScreenAddUserMutationVariables>(ProfileScreenAddUserDocument, options);
      }
export type ProfileScreenAddUserMutationHookResult = ReturnType<typeof useProfileScreenAddUserMutation>;
export type ProfileScreenAddUserMutationResult = Apollo.MutationResult<ProfileScreenAddUserMutation>;
export type ProfileScreenAddUserMutationOptions = Apollo.BaseMutationOptions<ProfileScreenAddUserMutation, ProfileScreenAddUserMutationVariables>;
export const ProfileScreenUpdateUserDocument = gql`
    mutation ProfileScreenUpdateUser($patch: UpdateUserInput!) {
  updateUser(input: $patch) {
    numUids
  }
}
    `;
export type ProfileScreenUpdateUserMutationFn = Apollo.MutationFunction<ProfileScreenUpdateUserMutation, ProfileScreenUpdateUserMutationVariables>;

/**
 * __useProfileScreenUpdateUserMutation__
 *
 * To run a mutation, you first call `useProfileScreenUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProfileScreenUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [profileScreenUpdateUserMutation, { data, loading, error }] = useProfileScreenUpdateUserMutation({
 *   variables: {
 *      patch: // value for 'patch'
 *   },
 * });
 */
export function useProfileScreenUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<ProfileScreenUpdateUserMutation, ProfileScreenUpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProfileScreenUpdateUserMutation, ProfileScreenUpdateUserMutationVariables>(ProfileScreenUpdateUserDocument, options);
      }
export type ProfileScreenUpdateUserMutationHookResult = ReturnType<typeof useProfileScreenUpdateUserMutation>;
export type ProfileScreenUpdateUserMutationResult = Apollo.MutationResult<ProfileScreenUpdateUserMutation>;
export type ProfileScreenUpdateUserMutationOptions = Apollo.BaseMutationOptions<ProfileScreenUpdateUserMutation, ProfileScreenUpdateUserMutationVariables>;