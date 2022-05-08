import { QueryResult, SubscriptionResult } from '@apollo/client'
import { useAuth } from '@nx-react-native/shared/auth'
import { useSuspense } from '@nx-react-native/shared/utils-suspense'

export function useApolloResult<T> (
  response: SubscriptionResult<T>
): SubscriptionResult<T>
export function useApolloResult<T> (response: QueryResult<T>): QueryResult<T>
export function useApolloResult<T> (
  response: SubscriptionResult<T> | QueryResult<T>
): SubscriptionResult<T> | QueryResult<T> {
  const { reLogin } = useAuth()
  const { loading, error } = response
  useSuspense(loading)

  if (error !== undefined) {
    if (
      error.message.includes('unable to parse jwt token:token is expired by')
    ) {
      void reLogin?.()
    } else {
      throw Error(error?.message)
    }
  }

  return response
}
