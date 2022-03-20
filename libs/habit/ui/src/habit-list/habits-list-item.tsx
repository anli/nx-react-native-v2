import { View } from '@nx-react-native/shared/ui'
import { format, formatISO } from 'date-fns'
import React from 'react'
import { List } from 'react-native-paper'
import { HabitWeekDay, HabitWeekDayProps } from './habit-week-day'

type WeekDataItem = { date: Date } & Pick<
HabitWeekDayProps,
'count' | 'habitActivityId' | 'habitId'
>

interface Item {
  id: string
  name: string
  weekData: WeekDataItem[]
}

export interface HabitsListItemProps {
  item: Item
  onItemPress: (id: string, name: string) => void
  onDayPress: HabitWeekDayProps['onPress']
}

export const HabitsListItem = ({
  item,
  onItemPress,
  onDayPress
}: HabitsListItemProps): JSX.Element => {
  const handleItemPress = (): void => {
    onItemPress(item.id, item.name)
  }

  return (
    <View>
      <List.Item onPress={handleItemPress} title={item.name} />
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
