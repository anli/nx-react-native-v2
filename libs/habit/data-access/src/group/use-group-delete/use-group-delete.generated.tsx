import * as Types from '../../graphql-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GroupDeleteMutationVariables = Types.Exact<{
  filter: Types.GroupFilter;
}>;


export type GroupDeleteMutation = { __typename: 'Mutation', deleteGroup?: { __typename: 'DeleteGroupPayload', numUids?: number | null } | null };


export const GroupDeleteDocument = gql`
    mutation GroupDelete($filter: GroupFilter!) {
  deleteGroup(filter: $filter) {
    numUids
  }
}
    `;
export type GroupDeleteMutationFn = Apollo.MutationFunction<GroupDeleteMutation, GroupDeleteMutationVariables>;

/**
 * __useGroupDeleteMutation__
 *
 * To run a mutation, you first call `useGroupDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGroupDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [groupDeleteMutation, { data, loading, error }] = useGroupDeleteMutation({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGroupDeleteMutation(baseOptions?: Apollo.MutationHookOptions<GroupDeleteMutation, GroupDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GroupDeleteMutation, GroupDeleteMutationVariables>(GroupDeleteDocument, options);
      }
export type GroupDeleteMutationHookResult = ReturnType<typeof useGroupDeleteMutation>;
export type GroupDeleteMutationResult = Apollo.MutationResult<GroupDeleteMutation>;
export type GroupDeleteMutationOptions = Apollo.BaseMutationOptions<GroupDeleteMutation, GroupDeleteMutationVariables>;