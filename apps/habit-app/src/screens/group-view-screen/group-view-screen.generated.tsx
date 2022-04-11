import * as Types from '../../graphql-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GroupViewScreenSubscriptionVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GroupViewScreenSubscription = { __typename: 'Subscription', getGroup?: { __typename: 'Group', id: string, name: string, adminUsersAggregate?: { __typename: 'UserAggregateResult', count?: number | null } | null } | null };

export type GroupViewScreenDeleteMutationVariables = Types.Exact<{
  filter: Types.GroupFilter;
}>;


export type GroupViewScreenDeleteMutation = { __typename: 'Mutation', deleteGroup?: { __typename: 'DeleteGroupPayload', numUids?: number | null } | null };


export const GroupViewScreenDocument = gql`
    subscription GroupViewScreen($id: ID!) {
  getGroup(id: $id) {
    id
    name
    adminUsersAggregate {
      count
    }
  }
}
    `;

/**
 * __useGroupViewScreenSubscription__
 *
 * To run a query within a React component, call `useGroupViewScreenSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGroupViewScreenSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupViewScreenSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGroupViewScreenSubscription(baseOptions: Apollo.SubscriptionHookOptions<GroupViewScreenSubscription, GroupViewScreenSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GroupViewScreenSubscription, GroupViewScreenSubscriptionVariables>(GroupViewScreenDocument, options);
      }
export type GroupViewScreenSubscriptionHookResult = ReturnType<typeof useGroupViewScreenSubscription>;
export type GroupViewScreenSubscriptionResult = Apollo.SubscriptionResult<GroupViewScreenSubscription>;
export const GroupViewScreenDeleteDocument = gql`
    mutation GroupViewScreenDelete($filter: GroupFilter!) {
  deleteGroup(filter: $filter) {
    numUids
  }
}
    `;
export type GroupViewScreenDeleteMutationFn = Apollo.MutationFunction<GroupViewScreenDeleteMutation, GroupViewScreenDeleteMutationVariables>;

/**
 * __useGroupViewScreenDeleteMutation__
 *
 * To run a mutation, you first call `useGroupViewScreenDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGroupViewScreenDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [groupViewScreenDeleteMutation, { data, loading, error }] = useGroupViewScreenDeleteMutation({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGroupViewScreenDeleteMutation(baseOptions?: Apollo.MutationHookOptions<GroupViewScreenDeleteMutation, GroupViewScreenDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GroupViewScreenDeleteMutation, GroupViewScreenDeleteMutationVariables>(GroupViewScreenDeleteDocument, options);
      }
export type GroupViewScreenDeleteMutationHookResult = ReturnType<typeof useGroupViewScreenDeleteMutation>;
export type GroupViewScreenDeleteMutationResult = Apollo.MutationResult<GroupViewScreenDeleteMutation>;
export type GroupViewScreenDeleteMutationOptions = Apollo.BaseMutationOptions<GroupViewScreenDeleteMutation, GroupViewScreenDeleteMutationVariables>;