import * as Types from '../../graphql-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GroupUpdateMutationVariables = Types.Exact<{
  input: Types.UpdateGroupInput;
}>;


export type GroupUpdateMutation = { __typename: 'Mutation', updateGroup?: { __typename: 'UpdateGroupPayload', numUids?: number | null } | null };


export const GroupUpdateDocument = gql`
    mutation GroupUpdate($input: UpdateGroupInput!) {
  updateGroup(input: $input) {
    numUids
  }
}
    `;
export type GroupUpdateMutationFn = Apollo.MutationFunction<GroupUpdateMutation, GroupUpdateMutationVariables>;

/**
 * __useGroupUpdateMutation__
 *
 * To run a mutation, you first call `useGroupUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGroupUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [groupUpdateMutation, { data, loading, error }] = useGroupUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGroupUpdateMutation(baseOptions?: Apollo.MutationHookOptions<GroupUpdateMutation, GroupUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GroupUpdateMutation, GroupUpdateMutationVariables>(GroupUpdateDocument, options);
      }
export type GroupUpdateMutationHookResult = ReturnType<typeof useGroupUpdateMutation>;
export type GroupUpdateMutationResult = Apollo.MutationResult<GroupUpdateMutation>;
export type GroupUpdateMutationOptions = Apollo.BaseMutationOptions<GroupUpdateMutation, GroupUpdateMutationVariables>;