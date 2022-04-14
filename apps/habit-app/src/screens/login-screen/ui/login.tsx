import { Button, Text, View } from '@nx-react-native/shared/ui'
import React, { FC } from 'react'
interface Props {
  title: string
  subtitle: string
  buttonTitle: string
  onPress: () => void
  buttonAccessibilityLabel: string
  loading: boolean
}

export const Component: FC<Props> = ({
  title,
  subtitle,
  buttonTitle,
  children,
  onPress,
  buttonAccessibilityLabel,
  loading
}) => {
  return (
    <>
      <View flex={1} justifyContent="flex-end" alignItems="center">
        {children}
      </View>
      <View padding="extraLoose">
        <Text marginBottom="base" variant="largeTitleEmphasized">
          {title}
        </Text>
        <Text marginBottom="base" variant="body" textAlign="justify">
          {subtitle}
        </Text>
        <Button
          disabled={loading}
          loading={loading}
          accessibilityLabel={buttonAccessibilityLabel}
          borderRadius="extraLoose"
          padding="tight"
          mode="contained"
          onPress={onPress}>
          {buttonTitle}
        </Button>
      </View>
    </>
  )
}
export const Login = {
  Component
}
