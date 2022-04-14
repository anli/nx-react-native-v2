import { View } from '@nx-react-native/shared/ui'
import { format, formatISO } from 'date-fns'
import { Maybe } from 'graphql/jsutils/Maybe'
import React from 'react'
import { GestureResponderEvent, PressableProps } from 'react-native'
import { List } from 'react-native-paper'
import { HabitWeekDay, HabitWeekDayProps } from './habit-week-day'

type WeekDataItem = { date: Date } & Pick<
HabitWeekDayProps,
'count' | 'habitActivityId' | 'habitId'
>

interface Item {
  id: string
  name: string
  group?: Maybe<{ name: string }>
  weekData: WeekDataItem[]
}

export type HabitsListItemProps = {
  item: Item
  onItemPress: (id: string) => void
  onDayPress: HabitWeekDayProps['onPress']
} & Pick<PressableProps, 'disabled' | 'onLongPress'>

export const HabitsListItem = ({
  item,
  onItemPress,
  onDayPress,
  onLongPress,
  disabled
}: HabitsListItemProps): JSX.Element => {
  const handleItemPress = (): void => {
    onItemPress(item.id)
  }

  const handleLongPress = (event: GestureResponderEvent): void => {
    onLongPress?.(event)
  }

  return (
    <View>
      <List.Item
        testID="HabitsListItem"
        onLongPress={handleLongPress}
        onPress={handleItemPress}
        title={item.name}
        description={item.group?.name}
        disabled={disabled ?? false}
      />
      <View flexDirection="row" justifyContent="space-around">
        {item.weekData.map(({ date, count, habitActivityId, habitId }) => {
          const dayName = format(date, 'EEEEEE')

          return (
            <HabitWeekDay
              key={dayName}
              id={formatISO(date)}
              name={dayName}
              count={count}
              habitId={habitId}
              habitActivityId={habitActivityId}
              onPress={onDayPress}
            />
          )
        })}
      </View>
    </View>
  )
}
