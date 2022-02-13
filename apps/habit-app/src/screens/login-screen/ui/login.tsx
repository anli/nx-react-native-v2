import { Button, Text, View } from '@nx-react-native/shared/ui'
import React, { FC } from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
interface Props {
  title: string
  subtitle: string
  buttonTitle: string
  onPress: () => void
  buttonAccessibilityLabel: string
}

export const Component: FC<Props> = ({
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

const Skeleton = (): JSX.Element => (
  <>
    <View flex={1} justifyContent="flex-end" alignItems="center" />
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item padding={32}>
        <SkeletonPlaceholder.Item marginBottom={16} width="50%" height={41} />

        <SkeletonPlaceholder.Item marginBottom={16}>
          <SkeletonPlaceholder.Item marginBottom={4} width="100%" height={22} />
          <SkeletonPlaceholder.Item marginBottom={4} height={22} />
        </SkeletonPlaceholder.Item>

        <SkeletonPlaceholder.Item width="100%" height={50} borderRadius={32} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  </>
)

export const Login = {
  Component,
  Skeleton
}
