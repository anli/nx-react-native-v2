import * as Types from '../../../utils/graphql-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type HabitUpdateMutationVariables = Types.Exact<{
  input: Types.UpdateHabitInput;
}>;


export type HabitUpdateMutation = { __typename?: 'Mutation', updateHabit?: { __typename?: 'UpdateHabitPayload', numUids?: number | null } | null };


export const HabitUpdateDocument = gql`
    mutation HabitUpdate($input: UpdateHabitInput!) {
  updateHabit(input: $input) {
    numUids
  }
}
    `;
export type HabitUpdateMutationFn = Apollo.MutationFunction<HabitUpdateMutation, HabitUpdateMutationVariables>;

/**
 * __useHabitUpdateMutation__
 *
 * To run a mutation, you first call `useHabitUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHabitUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [habitUpdateMutation, { data, loading, error }] = useHabitUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useHabitUpdateMutation(baseOptions?: Apollo.MutationHookOptions<HabitUpdateMutation, HabitUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HabitUpdateMutation, HabitUpdateMutationVariables>(HabitUpdateDocument, options);
      }
export type HabitUpdateMutationHookResult = ReturnType<typeof useHabitUpdateMutation>;
export type HabitUpdateMutationResult = Apollo.MutationResult<HabitUpdateMutation>;
export type HabitUpdateMutationOptions = Apollo.BaseMutationOptions<HabitUpdateMutation, HabitUpdateMutationVariables>;