import * as Types from '../../graphql-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GroupCreateMutationVariables = Types.Exact<{
  input: Array<Types.AddGroupInput> | Types.AddGroupInput;
}>;


export type GroupCreateMutation = { __typename: 'Mutation', addGroup?: { __typename: 'AddGroupPayload', numUids?: number | null } | null };


export const GroupCreateDocument = gql`
    mutation GroupCreate($input: [AddGroupInput!]!) {
  addGroup(input: $input) {
    numUids
  }
}
    `;
export type GroupCreateMutationFn = Apollo.MutationFunction<GroupCreateMutation, GroupCreateMutationVariables>;

/**
 * __useGroupCreateMutation__
 *
 * To run a mutation, you first call `useGroupCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGroupCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [groupCreateMutation, { data, loading, error }] = useGroupCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGroupCreateMutation(baseOptions?: Apollo.MutationHookOptions<GroupCreateMutation, GroupCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GroupCreateMutation, GroupCreateMutationVariables>(GroupCreateDocument, options);
      }
export type GroupCreateMutationHookResult = ReturnType<typeof useGroupCreateMutation>;
export type GroupCreateMutationResult = Apollo.MutationResult<GroupCreateMutation>;
export type GroupCreateMutationOptions = Apollo.BaseMutationOptions<GroupCreateMutation, GroupCreateMutationVariables>;