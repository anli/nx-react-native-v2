import {
  border,
  BorderProps,
  spacing,
  SpacingProps,
  useRestyle,
  VariantProps
} from '@shopify/restyle'
import React from 'react'
import { Button as PaperButton } from 'react-native-paper'
import { Theme } from '../..'

export type ButtonProps = SpacingProps<Theme> &
VariantProps<Theme, 'buttonVariants'> &
React.ComponentProps<typeof PaperButton> &
BorderProps<Theme>

export const Button = ({ children, ...rest }: ButtonProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props = useRestyle([spacing, border], rest) as any
  const { padding, ...restStyle } = props.style.find(Boolean)

  return (
    <PaperButton {...props} style={{ ...restStyle }} contentStyle={{ padding }}>
      {children}
    </PaperButton>
  )
}
