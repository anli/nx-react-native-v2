import * as Types from '../../graphql-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GroupCreateScreenAddMutationVariables = Types.Exact<{
  input: Array<Types.AddGroupInput> | Types.AddGroupInput;
}>;


export type GroupCreateScreenAddMutation = { __typename: 'Mutation', addGroup?: { __typename: 'AddGroupPayload', numUids?: number | null } | null };


export const GroupCreateScreenAddDocument = gql`
    mutation GroupCreateScreenAdd($input: [AddGroupInput!]!) {
  addGroup(input: $input) {
    numUids
  }
}
    `;
export type GroupCreateScreenAddMutationFn = Apollo.MutationFunction<GroupCreateScreenAddMutation, GroupCreateScreenAddMutationVariables>;

/**
 * __useGroupCreateScreenAddMutation__
 *
 * To run a mutation, you first call `useGroupCreateScreenAddMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGroupCreateScreenAddMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [groupCreateScreenAddMutation, { data, loading, error }] = useGroupCreateScreenAddMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGroupCreateScreenAddMutation(baseOptions?: Apollo.MutationHookOptions<GroupCreateScreenAddMutation, GroupCreateScreenAddMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GroupCreateScreenAddMutation, GroupCreateScreenAddMutationVariables>(GroupCreateScreenAddDocument, options);
      }
export type GroupCreateScreenAddMutationHookResult = ReturnType<typeof useGroupCreateScreenAddMutation>;
export type GroupCreateScreenAddMutationResult = Apollo.MutationResult<GroupCreateScreenAddMutation>;
export type GroupCreateScreenAddMutationOptions = Apollo.BaseMutationOptions<GroupCreateScreenAddMutation, GroupCreateScreenAddMutationVariables>;