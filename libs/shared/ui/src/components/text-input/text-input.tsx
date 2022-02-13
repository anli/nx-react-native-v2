import {
  backgroundColor,
  BackgroundColorProps,
  createRestyleComponent,
  createVariant,
  spacing,
  SpacingProps,
  typography,
  TypographyProps,
  VariantProps
} from '@shopify/restyle'
import React from 'react'
import { TextInput as PaperTextInput } from 'react-native-paper'
import { Theme } from '../..'

export type TextInputProps = SpacingProps<Theme> &
BackgroundColorProps<Theme> &
TypographyProps<Theme> &
VariantProps<Theme, 'textInputVariants'> &
React.ComponentProps<typeof PaperTextInput>

export const TextInput = createRestyleComponent<TextInputProps, Theme>(
  [
    spacing,
    typography,
    backgroundColor,
    createVariant({ themeKey: 'textInputVariants' })
  ],
  PaperTextInput
)
