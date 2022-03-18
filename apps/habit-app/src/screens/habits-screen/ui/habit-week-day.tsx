import { Text, View } from '@nx-react-native/shared/ui'
import React, { useEffect, useState } from 'react'
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
    const [isChecked, setIsChecked] = useState<boolean>(false)

    useEffect(() => {
      if (Boolean(count) !== isChecked) {
        setIsChecked(!(count === 0))
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count])

    const handlePress = (): void => {
      setIsChecked(!isChecked)
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
          status={isChecked ? 'checked' : 'unchecked'}
        />
      </View>
    )
  }
)
