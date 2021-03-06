/* istanbul ignore file */
import {
  ApolloClient,
  ApolloProvider as NativeApolloProvider,
  HttpLink,
  InMemoryCache,
  split
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import React, { FC } from 'react'

interface Props {
  url: string
  authToken?: string
}

export const ApolloProvider: FC<Props> = ({ children, url, authToken }) => {
  const wsLink = new WebSocketLink({
    uri: url.replace('https://', 'wss://'),
    options: {
      reconnect: true,
      minTimeout: 30000,
      connectionParams: {
        'X-Auth-Token': authToken
      }
    }
  })

  const authLink = setContext((_, { headers, ...rest }) => {
    if (authToken === undefined) {
      return { headers, ...rest }
    }

    return {
      ...rest,
      headers: {
        ...headers,
        'X-Auth-Token': authToken
      }
    }
  })

  const httpLink = new HttpLink({
    uri: url
  })

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink,
    authLink.concat(httpLink)
  )

  const client = new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Subscription: {
          fields: {
            queryHabit: {
              merge (_, incoming) {
                return incoming
              }
            },
            queryGroup: {
              merge (_, incoming) {
                return incoming
              }
            },
            getGroup: {
              merge (_, incoming) {
                return incoming
              }
            }
          }
        },
        Habit: {
          fields: {
            habitActivities: {
              merge (_, incoming) {
                return incoming
              }
            }
          }
        }
      }
    }),
    link: splitLink
  })

  return <NativeApolloProvider client={client}>{children}</NativeApolloProvider>
}
