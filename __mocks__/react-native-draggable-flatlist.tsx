import React from 'react'
import { FlatList } from 'react-native'

const actual = jest.requireActual('react-native-draggable-flatlist')

module.exports = {
  ...actual,
  __esModule: true,
  default: jest.fn().mockImplementation((props) => {
    return <FlatList {...props} />
  }),
  ScaleDecorator: jest
    .fn()
    .mockImplementation(({ children }) => <>{children}</>)
}
