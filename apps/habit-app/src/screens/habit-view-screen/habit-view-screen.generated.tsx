import * as Types from '../../graphql-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type HabitViewScreenSubscriptionVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  filter?: Types.InputMaybe<Types.HabitActivityFilter>;
}>;


export type HabitViewScreenSubscription = { __typename: 'Subscription', getHabit?: { __typename: 'Habit', name: string, habitActivities?: Array<{ __typename: 'HabitActivity', date: any, count: number }> | null } | null };


export const HabitViewScreenDocument = gql`
    subscription HabitViewScreen($id: ID!, $filter: HabitActivityFilter) {
  getHabit(id: $id) {
    habitActivities(filter: $filter, order: {asc: date}) {
      date
      count
    }
    name
  }
}
    `;

/**
 * __useHabitViewScreenSubscription__
 *
 * To run a query within a React component, call `useHabitViewScreenSubscription` and pass it any options that fit your needs.
 * When your component renders, `useHabitViewScreenSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHabitViewScreenSubscription({
 *   variables: {
 *      id: // value for 'id'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useHabitViewScreenSubscription(baseOptions: Apollo.SubscriptionHookOptions<HabitViewScreenSubscription, HabitViewScreenSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<HabitViewScreenSubscription, HabitViewScreenSubscriptionVariables>(HabitViewScreenDocument, options);
      }
export type HabitViewScreenSubscriptionHookResult = ReturnType<typeof useHabitViewScreenSubscription>;
export type HabitViewScreenSubscriptionResult = Apollo.SubscriptionResult<HabitViewScreenSubscription>;