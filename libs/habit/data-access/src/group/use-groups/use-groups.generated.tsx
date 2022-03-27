import * as Types from '../../graphql-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GroupsSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type GroupsSubscription = { __typename: 'Subscription', queryGroup?: Array<{ __typename: 'Group', id: string, name: string } | null> | null };


export const GroupsDocument = gql`
    subscription Groups {
  queryGroup {
    id
    name
  }
}
    `;

/**
 * __useGroupsSubscription__
 *
 * To run a query within a React component, call `useGroupsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGroupsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupsSubscription({
 *   variables: {
 *   },
 * });
 */
export function useGroupsSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GroupsSubscription, GroupsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GroupsSubscription, GroupsSubscriptionVariables>(GroupsDocument, options);
      }
export type GroupsSubscriptionHookResult = ReturnType<typeof useGroupsSubscription>;
export type GroupsSubscriptionResult = Apollo.SubscriptionResult<GroupsSubscription>;