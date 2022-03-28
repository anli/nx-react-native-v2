import * as Types from '../../graphql-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GroupSubscriptionVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GroupSubscription = { __typename: 'Subscription', getGroup?: { __typename: 'Group', id: string, name: string } | null };


export const GroupDocument = gql`
    subscription Group($id: ID!) {
  getGroup(id: $id) {
    id
    name
  }
}
    `;

/**
 * __useGroupSubscription__
 *
 * To run a query within a React component, call `useGroupSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGroupSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGroupSubscription(baseOptions: Apollo.SubscriptionHookOptions<GroupSubscription, GroupSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GroupSubscription, GroupSubscriptionVariables>(GroupDocument, options);
      }
export type GroupSubscriptionHookResult = ReturnType<typeof useGroupSubscription>;
export type GroupSubscriptionResult = Apollo.SubscriptionResult<GroupSubscription>;