import { Button, Text, View } from '@nx-react-native/shared/ui'
import React, { FC } from 'react'

interface Props {
  title: string
  subtitle: string
  buttonTitle: string
  onPress: () => void
  buttonAccessibilityLabel: string
}

export const Login: FC<Props> = ({
  title,
  subtitle,
  buttonTitle,
  children,
  onPress,
  buttonAccessibilityLabel
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
