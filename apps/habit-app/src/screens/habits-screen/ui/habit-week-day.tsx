import { Text, View } from '@nx-react-native/shared/ui'
import React from 'react'
import { Checkbox } from 'react-native-paper'

export interface HabitWeekDayProps {
  id: string
  name: string
  count: number
  habitActivityId?: string
  habitId: string
  onPress: ({
    id,
    habitId,
    habitActivityId
  }: {
    id: string
    habitId: string
    habitActivityId?: string
  }) => Promise<void>
}

export const HabitWeekDay = React.memo(
  ({
    name,
    id,
    count,
    habitActivityId,
    habitId,
    onPress
  }: HabitWeekDayProps): JSX.Element => {
    const handlePress = (): void => {
      void onPress({
        id,
        habitActivityId,
        habitId
      })
    }

    return (
      <View justifyContent="center" alignItems="center">
        <Text variant="footnote">{name}</Text>
        <Checkbox.Android
          testID="HabitWeekDay.Checkbox"
          onPress={handlePress}
          status={count > 0 ? 'checked' : 'unchecked'}
        />
      </View>
    )
  }
)
