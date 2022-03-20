import * as Types from '../graphql-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type HabitActivityCreateMutationVariables = Types.Exact<{
  input: Array<Types.AddHabitActivityInput> | Types.AddHabitActivityInput;
}>;


export type HabitActivityCreateMutation = { __typename: 'Mutation', addHabitActivity?: { __typename: 'AddHabitActivityPayload', numUids?: number | null } | null };


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