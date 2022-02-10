import * as tokens from '@shopify/polaris-tokens'
import { baseTheme, Theme } from './base'

export const darkTheme: Theme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    surface: tokens.colorBlack,
    text: tokens.colorWhite,
    success: tokens.colorGreen,
    warning: tokens.colorYellow,
    critical: tokens.colorRed,
    primary: tokens.colorGreenDark,
    icon: tokens.colorWhite,
    border: tokens.colorWhite
  }
}
