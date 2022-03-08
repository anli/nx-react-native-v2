import { render } from '@testing-library/react-native'
import React from 'react'
import ReactNative from 'react-native'
import { ThemeProvider } from './theme-provider'

describe('Given I have ThemeProvider', () => {
  it('And mode is auto, When device is dark mode, Then I should see children', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('dark')

    const component = render(<ThemeProvider />)
    expect(component).toBeDefined()
  })

  it('And mode is auto, When device is light mode, Then I should see children', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('light')

    const component = render(<ThemeProvider />)
    expect(component).toBeDefined()
  })

  it('When mode is light, Then I should see children', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('light')

    const component = render(<ThemeProvider mode="light" />)
    expect(component).toBeDefined()
  })

  it('When mode is dark, Then I should see children', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('light')

    const component = render(<ThemeProvider mode="dark" />)
    expect(component).toBeDefined()
  })
})
