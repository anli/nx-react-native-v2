import { ThemeProvider as RestyleThemeProvider } from '@shopify/restyle'
import React, { FC } from 'react'
import { useColorScheme } from 'react-native'
import { darkTheme, lightTheme } from '../../themes'

export const ThemeProvider: FC = ({ children }) => {
  const colorScheme = useColorScheme()
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme

  return <RestyleThemeProvider theme={theme}>{children}</RestyleThemeProvider>
}
