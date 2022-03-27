import * as Types from '../../graphql-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type HabitDeleteMutationVariables = Types.Exact<{
  filter: Types.HabitFilter;
}>;


export type HabitDeleteMutation = { __typename: 'Mutation', deleteHabit?: { __typename: 'DeleteHabitPayload', numUids?: number | null } | null };


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