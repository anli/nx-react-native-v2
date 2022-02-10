import {
  backgroundColor,
  BackgroundColorProps,
  createRestyleComponent,
  createVariant,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
  VariantProps
} from '@shopify/restyle'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { Theme } from '../..'

export type ScreenProps = SpacingProps<Theme> &
LayoutProps<Theme> &
BackgroundColorProps<Theme> &
VariantProps<Theme, 'screenVariants'> &
React.ComponentProps<typeof SafeAreaView> & {
  children?: React.ReactNode
}
export const Screen = createRestyleComponent<ScreenProps, Theme>(
  [
    spacing,
    layout,
    backgroundColor,
    createVariant({ themeKey: 'screenVariants' })
  ],
  SafeAreaView
)
