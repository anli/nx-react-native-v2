import * as tokens from '@shopify/polaris-tokens'
import { createTheme } from '@shopify/restyle'

const pxToNumber = (px: string): number => {
  return parseInt(px.replace('px', ''), 10)
}

// https://www.figma.com/file/QwZvryiWjvuE0nnBWBDUXn/Polaris-for-Admin%3A-Colors-(Community)?node-id=2989%3A136
const base = {
  colors: {
    border: '',
    surface: '',
    text: '',
    success: '',
    warning: '',
    critical: '',
    primary: '',
    icon: '',
    transparent: 'transparent'
  },
  spacing: {
    none: 0,
    extraTight: pxToNumber(tokens.spacingExtraTight),
    tight: pxToNumber(tokens.spacingTight),
    baseTight: pxToNumber(tokens.spacingBaseTight),
    base: pxToNumber(tokens.spacingBase),
    loose: pxToNumber(tokens.spacingLoose),
    extraLoose: pxToNumber(tokens.spacingExtraLoose)
  },
  borderRadii: {
    none: 0,
    extraTight: pxToNumber(tokens.spacingExtraTight),
    tight: pxToNumber(tokens.spacingTight),
    baseTight: pxToNumber(tokens.spacingBaseTight),
    base: pxToNumber(tokens.spacingBase),
    loose: pxToNumber(tokens.spacingLoose),
    extraLoose: pxToNumber(tokens.spacingExtraLoose)
  },
  breakpoints: {
    phone: 0,
    tablet: 768
  },
  textVariants: {
    // https://github.com/hectahertz/react-native-typography/blob/master/src/collections/iOSUIKit.js
    defaults: {
      fontSize: 18,
      color: 'text'
    }
  },
  screenVariants: {
    defaults: {
      flex: 1,
      backgroundColor: 'surface'
    }
  }
}

export const baseTheme = createTheme({
  ...base
})

export type Theme = typeof baseTheme
