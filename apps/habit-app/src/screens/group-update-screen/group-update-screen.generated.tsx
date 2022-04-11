import * as Types from '../../graphql-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GroupUpdateScreenQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GroupUpdateScreenQuery = { __typename: 'Query', getGroup?: { __typename: 'Group', id: string, name: string } | null };

export type GroupUpdateScreenUpdateMutationVariables = Types.Exact<{
  input: Types.UpdateGroupInput;
}>;


export type GroupUpdateScreenUpdateMutation = { __typename: 'Mutation', updateGroup?: { __typename: 'UpdateGroupPayload', numUids?: number | null } | null };


export const GroupUpdateScreenDocument = gql`
    query GroupUpdateScreen($id: ID!) {
  getGroup(id: $id) {
    id
    name
  }
}
    `;

/**
 * __useGroupUpdateScreenQuery__
 *
 * To run a query within a React component, call `useGroupUpdateScreenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupUpdateScreenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupUpdateScreenQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGroupUpdateScreenQuery(baseOptions: Apollo.QueryHookOptions<GroupUpdateScreenQuery, GroupUpdateScreenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GroupUpdateScreenQuery, GroupUpdateScreenQueryVariables>(GroupUpdateScreenDocument, options);
      }
export function useGroupUpdateScreenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GroupUpdateScreenQuery, GroupUpdateScreenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GroupUpdateScreenQuery, GroupUpdateScreenQueryVariables>(GroupUpdateScreenDocument, options);
        }
export type GroupUpdateScreenQueryHookResult = ReturnType<typeof useGroupUpdateScreenQuery>;
export type GroupUpdateScreenLazyQueryHookResult = ReturnType<typeof useGroupUpdateScreenLazyQuery>;
export type GroupUpdateScreenQueryResult = Apollo.QueryResult<GroupUpdateScreenQuery, GroupUpdateScreenQueryVariables>;
export const GroupUpdateScreenUpdateDocument = gql`
    mutation GroupUpdateScreenUpdate($input: UpdateGroupInput!) {
  updateGroup(input: $input) {
    numUids
  }
}
    `;
export type GroupUpdateScreenUpdateMutationFn = Apollo.MutationFunction<GroupUpdateScreenUpdateMutation, GroupUpdateScreenUpdateMutationVariables>;

/**
 * __useGroupUpdateScreenUpdateMutation__
 *
 * To run a mutation, you first call `useGroupUpdateScreenUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGroupUpdateScreenUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [groupUpdateScreenUpdateMutation, { data, loading, error }] = useGroupUpdateScreenUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGroupUpdateScreenUpdateMutation(baseOptions?: Apollo.MutationHookOptions<GroupUpdateScreenUpdateMutation, GroupUpdateScreenUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GroupUpdateScreenUpdateMutation, GroupUpdateScreenUpdateMutationVariables>(GroupUpdateScreenUpdateDocument, options);
      }
export type GroupUpdateScreenUpdateMutationHookResult = ReturnType<typeof useGroupUpdateScreenUpdateMutation>;
export type GroupUpdateScreenUpdateMutationResult = Apollo.MutationResult<GroupUpdateScreenUpdateMutation>;
export type GroupUpdateScreenUpdateMutationOptions = Apollo.BaseMutationOptions<GroupUpdateScreenUpdateMutation, GroupUpdateScreenUpdateMutationVariables>;