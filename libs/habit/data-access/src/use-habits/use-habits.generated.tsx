import * as Types from '../graphql-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type HabitsSubscriptionVariables = Types.Exact<{
  minDate: Types.Scalars['DateTime'];
  maxDate: Types.Scalars['DateTime'];
}>;


export type HabitsSubscription = { __typename: 'Subscription', queryHabit?: Array<{ __typename: 'Habit', id: string, name: string, habitActivities?: Array<{ __typename: 'HabitActivity', id: string, count: number, date: any }> | null } | null> | null };


export const HabitsDocument = gql`
    subscription Habits($minDate: DateTime!, $maxDate: DateTime!) {
  queryHabit {
    habitActivities(filter: {date: {between: {min: $minDate, max: $maxDate}}}) {
      id
      count
      date
    }
    id
    name
  }
}
    `;

/**
 * __useHabitsSubscription__
 *
 * To run a query within a React component, call `useHabitsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useHabitsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHabitsSubscription({
 *   variables: {
 *      minDate: // value for 'minDate'
 *      maxDate: // value for 'maxDate'
 *   },
 * });
 */
export function useHabitsSubscription(baseOptions: Apollo.SubscriptionHookOptions<HabitsSubscription, HabitsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<HabitsSubscription, HabitsSubscriptionVariables>(HabitsDocument, options);
      }
export type HabitsSubscriptionHookResult = ReturnType<typeof useHabitsSubscription>;
export type HabitsSubscriptionResult = Apollo.SubscriptionResult<HabitsSubscription>;