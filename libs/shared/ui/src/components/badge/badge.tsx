import {
  backgroundColor,
  BackgroundColorProps,
  SpacingProps,
  useRestyle,
  VariantProps
} from '@shopify/restyle'
import React from 'react'
import { Badge as PaperBadge } from 'react-native-paper'
import { Theme } from '../..'

export type BadgeProps = SpacingProps<Theme> &
VariantProps<Theme, 'badgeVariants'> &
React.ComponentProps<typeof PaperBadge> &
BackgroundColorProps<Theme>

export const Badge = ({ children, ...rest }: BadgeProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props = useRestyle([backgroundColor], rest) as any
  const { ...restStyle } = props.style.find(Boolean)

  return (
    <PaperBadge {...props} style={{ ...restStyle }}>
      {children}
    </PaperBadge>
  )
}
