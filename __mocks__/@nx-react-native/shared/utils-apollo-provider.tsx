import React from 'react'

const actual = jest.requireActual(
  '@nx-react-native/shared/utils-apollo-provider'
)

module.exports = {
  ...actual,
  ApolloProvider: ({ children }) => <>{children}</>
}
