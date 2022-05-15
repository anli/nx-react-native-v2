import { Text, View } from '@nx-react-native/shared/ui'
import { isToday, parseISO } from 'date-fns'
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
    habitActivityId,
    pushNotificationUserIds,
    habitName,
    date
  }: {
    id: string
    habitId: string
    habitActivityId?: string
    pushNotificationUserIds?: string[]
    habitName: string
    date: Date
  }) => Promise<void>
  pushNotificationUserIdsString?: string
  habitName: string
}

export const HabitWeekDay = React.memo(
  ({
    name,
    id,
    count,
    habitActivityId,
    habitId,
    onPress,
    pushNotificationUserIdsString,
    habitName
  }: HabitWeekDayProps): JSX.Element => {
    const [isChecked, setIsChecked] = useState<boolean>(false)

    useEffect(() => {
      if (Boolean(count) !== isChecked) {
        setIsChecked(count !== 0)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count])

    /* istanbul ignore next */
    const handlePress = (): void => {
      setIsChecked(!isChecked)
      void onPress({
        id,
        habitActivityId,
        habitId,
        pushNotificationUserIds:
          pushNotificationUserIdsString != null
            ? JSON.parse(pushNotificationUserIdsString)
            : undefined,
        habitName,
        date: parseISO(id)
      })
    }

    const isIdToday = isToday(parseISO(id))

    return (
      <View justifyContent="center" alignItems="center">
        <Text variant="footnote" color={isIdToday ? 'primary' : 'text'}>
          {name}
        </Text>
        <Checkbox.Android
          testID="HabitWeekDay.Checkbox"
          onPress={handlePress}
          status={isChecked ? 'checked' : 'unchecked'}
        />
      </View>
    )
  }
)
