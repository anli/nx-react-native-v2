import { MutationTuple } from '@apollo/client'
import { useSuspense } from '@nx-react-native/shared/utils-suspense'

export const useApolloMutation = <T, V>(
  response: MutationTuple<T, V>
): MutationTuple<T, V> => {
  const [, { loading, error }] = response
  useSuspense(loading)

  if (error !== undefined) {
    throw Error(error?.message)
  }

  return response
}
