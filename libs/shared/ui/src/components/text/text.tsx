import { createText } from '@shopify/restyle'
import { TextProps as NativeTextProps } from 'react-native'
import { Theme } from '../../themes'

export type TextProps = NativeTextProps

export const Text = createText<Theme>()
