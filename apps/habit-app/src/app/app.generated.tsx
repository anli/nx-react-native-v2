import * as Types from '../graphql-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AppAddUserMutationVariables = Types.Exact<{
  input: Array<Types.AddUserInput> | Types.AddUserInput;
}>;


export type AppAddUserMutation = { __typename: 'Mutation', addUser?: { __typename: 'AddUserPayload', numUids?: number | null } | null };


export const AppAddUserDocument = gql`
    mutation AppAddUser($input: [AddUserInput!]!) {
  addUser(input: $input, upsert: true) {
    numUids
  }
}
    `;
export type AppAddUserMutationFn = Apollo.MutationFunction<AppAddUserMutation, AppAddUserMutationVariables>;

/**
 * __useAppAddUserMutation__
 *
 * To run a mutation, you first call `useAppAddUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAppAddUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appAddUserMutation, { data, loading, error }] = useAppAddUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAppAddUserMutation(baseOptions?: Apollo.MutationHookOptions<AppAddUserMutation, AppAddUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AppAddUserMutation, AppAddUserMutationVariables>(AppAddUserDocument, options);
      }
export type AppAddUserMutationHookResult = ReturnType<typeof useAppAddUserMutation>;
export type AppAddUserMutationResult = Apollo.MutationResult<AppAddUserMutation>;
export type AppAddUserMutationOptions = Apollo.BaseMutationOptions<AppAddUserMutation, AppAddUserMutationVariables>;