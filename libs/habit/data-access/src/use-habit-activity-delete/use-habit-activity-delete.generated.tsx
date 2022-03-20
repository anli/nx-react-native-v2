import * as Types from '../graphql-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type HabitActivityDeleteMutationVariables = Types.Exact<{
  filter: Types.HabitActivityFilter;
}>;


export type HabitActivityDeleteMutation = { __typename: 'Mutation', deleteHabitActivity?: { __typename: 'DeleteHabitActivityPayload', numUids?: number | null } | null };


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