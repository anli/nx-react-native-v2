import { View } from '@nx-react-native/shared/ui'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

export const HabitFormSkeleton = (): JSX.Element => (
  <>
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item padding={32}>
        <SkeletonPlaceholder.Item marginBottom={16} width="100%" height={56} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>

    <View flex={1} />

    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item padding={32}>
        <SkeletonPlaceholder.Item width="100%" height={50} borderRadius={32} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  </>
)
