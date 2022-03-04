import { View } from '@nx-react-native/shared/ui'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

const skeletonData = Array.from({ length: 10 }, (_, key) => ({ key }))

const Skeleton = (): JSX.Element => {
  return (
    <View>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item padding={32}>
          {skeletonData.map(({ key }) => (
            <SkeletonPlaceholder.Item
              key={key}
              marginBottom={16}
              width="100%"
              height={41}
            />
          ))}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  )
}

export const HabitsList = {
  Skeleton
}
