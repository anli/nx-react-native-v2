import { ThemeProvider as RestyleThemeProvider } from '@shopify/restyle'
import React, { FC } from 'react'
import { useColorScheme } from 'react-native'
import { darkTheme, lightTheme } from '../../themes'

interface ThemeProviderProps {
  mode?: 'light' | 'dark' | 'auto'
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  mode = 'auto'
}) => {
  const colorScheme = useColorScheme()
  const theme = {
    auto: colorScheme === 'dark' ? darkTheme : lightTheme,
    light: lightTheme,
    dark: darkTheme
  }[mode]

  return <RestyleThemeProvider theme={theme}>{children}</RestyleThemeProvider>
}
