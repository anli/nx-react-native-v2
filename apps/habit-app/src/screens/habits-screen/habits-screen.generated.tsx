import * as Apollo from '@apollo/client';
import { gql } from '@apollo/client';
import * as Types from '../../graphql-types';

const defaultOptions = {} as const;
export type HabitsSubscriptionVariables = Types.Exact<{
  minDate: Types.Scalars['DateTime'];
  maxDate: Types.Scalars['DateTime'];
  user?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type HabitsSubscription = { __typename: 'Subscription', queryHabit?: Array<{ __typename: 'Habit', id: string, name: string, habitActivities?: Array<{ __typename: 'HabitActivity', id: string, count: number, date: any }> | null, group?: { __typename: 'Group', name: string, adminUsers?: Array<{ __typename: 'User', pushNotificationUserId?: string | null }> | null } | null } | null> | null };

export type HabitActivityDeleteMutationVariables = Types.Exact<{
  filter: Types.HabitActivityFilter;
}>;


export type HabitActivityDeleteMutation = { __typename: 'Mutation', deleteHabitActivity?: { __typename: 'DeleteHabitActivityPayload', numUids?: number | null } | null };

export type HabitActivityCreateMutationVariables = Types.Exact<{
  input: Array<Types.AddHabitActivityInput> | Types.AddHabitActivityInput;
}>;


export type HabitActivityCreateMutation = { __typename: 'Mutation', addHabitActivity?: { __typename: 'AddHabitActivityPayload', numUids?: number | null } | null };

export type HabitDeleteMutationVariables = Types.Exact<{
  filter: Types.HabitFilter;
}>;


export type HabitDeleteMutation = { __typename: 'Mutation', deleteHabit?: { __typename: 'DeleteHabitPayload', numUids?: number | null } | null };


export const HabitsDocument = gql`
    subscription Habits($minDate: DateTime!, $maxDate: DateTime!, $user: String) {
  queryHabit {
    habitActivities(filter: {date: {between: {min: $minDate, max: $maxDate}}}) {
      id
      count
      date
    }
    id
    name
    group {
      name
      adminUsers(filter: {has: pushNotificationUserId, not: {email: {eq: $user}}}) {
        pushNotificationUserId
      }
    }
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
 *      user: // value for 'user'
 *   },
 * });
 */
export function useHabitsSubscription(baseOptions: Apollo.SubscriptionHookOptions<HabitsSubscription, HabitsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<HabitsSubscription, HabitsSubscriptionVariables>(HabitsDocument, options);
      }
export type HabitsSubscriptionHookResult = ReturnType<typeof useHabitsSubscription>;
export type HabitsSubscriptionResult = Apollo.SubscriptionResult<HabitsSubscription>;
export const HabitActivityDeleteDocument = gql`
    mutation HabitActivityDelete($filter: HabitActivityFilter!) {
  deleteHabitActivity(filter: $filter) {
    numUids
  }
}
    `;
export type HabitActivityDeleteMutationFn = Apollo.MutationFunction<HabitActivityDeleteMutation, HabitActivityDeleteMutationVariables>;

/**
 * __useHabitActivityDeleteMutation__
 *
 * To run a mutation, you first call `useHabitActivityDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHabitActivityDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [habitActivityDeleteMutation, { data, loading, error }] = useHabitActivityDeleteMutation({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useHabitActivityDeleteMutation(baseOptions?: Apollo.MutationHookOptions<HabitActivityDeleteMutation, HabitActivityDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HabitActivityDeleteMutation, HabitActivityDeleteMutationVariables>(HabitActivityDeleteDocument, options);
      }
export type HabitActivityDeleteMutationHookResult = ReturnType<typeof useHabitActivityDeleteMutation>;
export type HabitActivityDeleteMutationResult = Apollo.MutationResult<HabitActivityDeleteMutation>;
export type HabitActivityDeleteMutationOptions = Apollo.BaseMutationOptions<HabitActivityDeleteMutation, HabitActivityDeleteMutationVariables>;
export const HabitActivityCreateDocument = gql`
    mutation HabitActivityCreate($input: [AddHabitActivityInput!]!) {
  addHabitActivity(input: $input) {
    numUids
  }
}
    `;
export type HabitActivityCreateMutationFn = Apollo.MutationFunction<HabitActivityCreateMutation, HabitActivityCreateMutationVariables>;

/**
 * __useHabitActivityCreateMutation__
 *
 * To run a mutation, you first call `useHabitActivityCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHabitActivityCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [habitActivityCreateMutation, { data, loading, error }] = useHabitActivityCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useHabitActivityCreateMutation(baseOptions?: Apollo.MutationHookOptions<HabitActivityCreateMutation, HabitActivityCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HabitActivityCreateMutation, HabitActivityCreateMutationVariables>(HabitActivityCreateDocument, options);
      }
export type HabitActivityCreateMutationHookResult = ReturnType<typeof useHabitActivityCreateMutation>;
export type HabitActivityCreateMutationResult = Apollo.MutationResult<HabitActivityCreateMutation>;
export type HabitActivityCreateMutationOptions = Apollo.BaseMutationOptions<HabitActivityCreateMutation, HabitActivityCreateMutationVariables>;
export const HabitDeleteDocument = gql`
    mutation HabitDelete($filter: HabitFilter!) {
  deleteHabit(filter: $filter) {
    numUids
  }
}
    `;
export type HabitDeleteMutationFn = Apollo.MutationFunction<HabitDeleteMutation, HabitDeleteMutationVariables>;

/**
 * __useHabitDeleteMutation__
 *
 * To run a mutation, you first call `useHabitDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHabitDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [habitDeleteMutation, { data, loading, error }] = useHabitDeleteMutation({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useHabitDeleteMutation(baseOptions?: Apollo.MutationHookOptions<HabitDeleteMutation, HabitDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HabitDeleteMutation, HabitDeleteMutationVariables>(HabitDeleteDocument, options);
      }
export type HabitDeleteMutationHookResult = ReturnType<typeof useHabitDeleteMutation>;
export type HabitDeleteMutationResult = Apollo.MutationResult<HabitDeleteMutation>;
export type HabitDeleteMutationOptions = Apollo.BaseMutationOptions<HabitDeleteMutation, HabitDeleteMutationVariables>;