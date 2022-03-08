import { View } from '@nx-react-native/shared/ui'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

const skeletonData = Array.from({ length: 4 }, (_, key) => ({ key }))

export const HabitsListSkeleton = (): JSX.Element => {
  return (
    <View>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          paddingTop={12}
          paddingBottom={24}
          paddingHorizontal={20}>
          <SkeletonPlaceholder.Item width="30%" height={14} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item paddingHorizontal={20} paddingVertical={4}>
          {skeletonData.map(({ key }) => (
            <SkeletonPlaceholder.Item
              key={key}
              marginBottom={16}
              width="100%"
              height={85}
            />
          ))}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  )
}
