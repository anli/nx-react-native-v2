import * as tokens from '@shopify/polaris-tokens'
import { baseTheme, Theme } from './base'

export const lightTheme: Theme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    border: '#8C9196',
    surface: tokens.colorWhite,
    text: tokens.colorBlack,
    success: tokens.colorGreen,
    warning: tokens.colorYellow,
    critical: tokens.colorRed,
    primary: tokens.colorGreen,
    icon: tokens.colorBlack
  }
}
