import React from 'react'
import { render } from '@testing-library/react-native'

import { ThemeProvider } from './theme-provider'
import ReactNative from 'react-native'

test('renders correctly in dark mode', () => {
  jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('dark')

  const component = render(<ThemeProvider />)
  expect(component).toBeDefined()
})

test('renders correctly in light mode', () => {
  jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('light')

  const component = render(<ThemeProvider />)
  expect(component).toBeDefined()
})
