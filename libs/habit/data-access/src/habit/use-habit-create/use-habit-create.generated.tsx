import * as Types from '../../graphql-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type HabitCreateMutationVariables = Types.Exact<{
  input: Array<Types.AddHabitInput> | Types.AddHabitInput;
}>;


export type HabitCreateMutation = { __typename: 'Mutation', addHabit?: { __typename: 'AddHabitPayload', numUids?: number | null } | null };


export const HabitCreateDocument = gql`
    mutation HabitCreate($input: [AddHabitInput!]!) {
  addHabit(input: $input) {
    numUids
  }
}
    `;
export type HabitCreateMutationFn = Apollo.MutationFunction<HabitCreateMutation, HabitCreateMutationVariables>;

/**
 * __useHabitCreateMutation__
 *
 * To run a mutation, you first call `useHabitCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHabitCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [habitCreateMutation, { data, loading, error }] = useHabitCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useHabitCreateMutation(baseOptions?: Apollo.MutationHookOptions<HabitCreateMutation, HabitCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HabitCreateMutation, HabitCreateMutationVariables>(HabitCreateDocument, options);
      }
export type HabitCreateMutationHookResult = ReturnType<typeof useHabitCreateMutation>;
export type HabitCreateMutationResult = Apollo.MutationResult<HabitCreateMutation>;
export type HabitCreateMutationOptions = Apollo.BaseMutationOptions<HabitCreateMutation, HabitCreateMutationVariables>;