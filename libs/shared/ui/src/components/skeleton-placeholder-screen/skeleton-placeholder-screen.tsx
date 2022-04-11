import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { Screen } from '../screen'
import { View } from '../view'

interface Props {
  testID?: string
}

export const SkeletonPlaceholderScreen = ({ testID }: Props): JSX.Element => (
  <Screen testID={testID}>
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item padding={32}>
        <SkeletonPlaceholder.Item marginBottom={32} width="50%" height={41} />

        <SkeletonPlaceholder.Item marginBottom={32} width="100%" height={41} />

        <SkeletonPlaceholder.Item marginBottom={32} width="100%" height={41} />

        <SkeletonPlaceholder.Item marginBottom={32} width="100%" height={41} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
    <View flex={1} justifyContent="flex-end" alignItems="center" />
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item padding={32}>
        <SkeletonPlaceholder.Item width="100%" height={50} borderRadius={32} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  </Screen>
)
