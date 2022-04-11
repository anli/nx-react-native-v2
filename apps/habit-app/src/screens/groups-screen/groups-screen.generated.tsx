import * as Types from '../../graphql-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GroupsScreenSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type GroupsScreenSubscription = { __typename: 'Subscription', queryGroup?: Array<{ __typename: 'Group', id: string, name: string } | null> | null };


export const GroupsScreenDocument = gql`
    subscription GroupsScreen {
  queryGroup {
    id
    name
  }
}
    `;

/**
 * __useGroupsScreenSubscription__
 *
 * To run a query within a React component, call `useGroupsScreenSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGroupsScreenSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupsScreenSubscription({
 *   variables: {
 *   },
 * });
 */
export function useGroupsScreenSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GroupsScreenSubscription, GroupsScreenSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GroupsScreenSubscription, GroupsScreenSubscriptionVariables>(GroupsScreenDocument, options);
      }
export type GroupsScreenSubscriptionHookResult = ReturnType<typeof useGroupsScreenSubscription>;
export type GroupsScreenSubscriptionResult = Apollo.SubscriptionResult<GroupsScreenSubscription>;