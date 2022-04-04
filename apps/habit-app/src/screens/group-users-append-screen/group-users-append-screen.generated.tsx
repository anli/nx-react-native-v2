import * as Types from '../../graphql-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SetAdminUserMutationVariables = Types.Exact<{
  id?: Types.InputMaybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>;
  email: Types.Scalars['String'];
}>;


export type SetAdminUserMutation = { __typename: 'Mutation', updateGroup?: { __typename: 'UpdateGroupPayload', numUids?: number | null } | null };


export const SetAdminUserDocument = gql`
    mutation SetAdminUser($id: [ID!], $email: String!) {
  updateGroup(input: {filter: {id: $id}, set: {adminUsers: {email: $email}}}) {
    numUids
  }
}
    `;
export type SetAdminUserMutationFn = Apollo.MutationFunction<SetAdminUserMutation, SetAdminUserMutationVariables>;

/**
 * __useSetAdminUserMutation__
 *
 * To run a mutation, you first call `useSetAdminUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetAdminUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setAdminUserMutation, { data, loading, error }] = useSetAdminUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSetAdminUserMutation(baseOptions?: Apollo.MutationHookOptions<SetAdminUserMutation, SetAdminUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetAdminUserMutation, SetAdminUserMutationVariables>(SetAdminUserDocument, options);
      }
export type SetAdminUserMutationHookResult = ReturnType<typeof useSetAdminUserMutation>;
export type SetAdminUserMutationResult = Apollo.MutationResult<SetAdminUserMutation>;
export type SetAdminUserMutationOptions = Apollo.BaseMutationOptions<SetAdminUserMutation, SetAdminUserMutationVariables>;