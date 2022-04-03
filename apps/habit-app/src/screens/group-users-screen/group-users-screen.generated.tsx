import * as Types from '../../graphql-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GroupUsersScreenSubscriptionVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GroupUsersScreenSubscription = { __typename: 'Subscription', getGroup?: { __typename: 'Group', adminUsers?: Array<{ __typename: 'User', id: string, email: string }> | null } | null };

export type RemoveAdminUserMutationVariables = Types.Exact<{
  id?: Types.InputMaybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>;
  email: Types.Scalars['String'];
}>;


export type RemoveAdminUserMutation = { __typename: 'Mutation', updateGroup?: { __typename: 'UpdateGroupPayload', numUids?: number | null } | null };


export const GroupUsersScreenDocument = gql`
    subscription GroupUsersScreen($id: ID!) {
  getGroup(id: $id) {
    adminUsers {
      id
      email
    }
  }
}
    `;

/**
 * __useGroupUsersScreenSubscription__
 *
 * To run a query within a React component, call `useGroupUsersScreenSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGroupUsersScreenSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupUsersScreenSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGroupUsersScreenSubscription(baseOptions: Apollo.SubscriptionHookOptions<GroupUsersScreenSubscription, GroupUsersScreenSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GroupUsersScreenSubscription, GroupUsersScreenSubscriptionVariables>(GroupUsersScreenDocument, options);
      }
export type GroupUsersScreenSubscriptionHookResult = ReturnType<typeof useGroupUsersScreenSubscription>;
export type GroupUsersScreenSubscriptionResult = Apollo.SubscriptionResult<GroupUsersScreenSubscription>;
export const RemoveAdminUserDocument = gql`
    mutation RemoveAdminUser($id: [ID!], $email: String!) {
  updateGroup(input: {filter: {id: $id}, remove: {adminUsers: {email: $email}}}) {
    numUids
  }
}
    `;
export type RemoveAdminUserMutationFn = Apollo.MutationFunction<RemoveAdminUserMutation, RemoveAdminUserMutationVariables>;

/**
 * __useRemoveAdminUserMutation__
 *
 * To run a mutation, you first call `useRemoveAdminUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAdminUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAdminUserMutation, { data, loading, error }] = useRemoveAdminUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRemoveAdminUserMutation(baseOptions?: Apollo.MutationHookOptions<RemoveAdminUserMutation, RemoveAdminUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveAdminUserMutation, RemoveAdminUserMutationVariables>(RemoveAdminUserDocument, options);
      }
export type RemoveAdminUserMutationHookResult = ReturnType<typeof useRemoveAdminUserMutation>;
export type RemoveAdminUserMutationResult = Apollo.MutationResult<RemoveAdminUserMutation>;
export type RemoveAdminUserMutationOptions = Apollo.BaseMutationOptions<RemoveAdminUserMutation, RemoveAdminUserMutationVariables>;