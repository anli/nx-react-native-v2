import { useActionSheet } from '@expo/react-native-action-sheet'
import {
  useHabitActivityCreateMutation,
  useHabitActivityDeleteMutation,
  useHabitDeleteMutation,
  useHabitsSubscription
} from '@nx-react-native/habit/data-access'
import {
  HabitsListItem,
  HabitsListItemProps,
  HabitsListSkeleton
} from '@nx-react-native/habit/ui'
import { Screen, Text, View } from '@nx-react-native/shared/ui'
import { filterNullable } from '@nx-react-native/shared/utils'
import { formatDateRange } from '@nx-react-native/shared/utils-date'
import { Suspender } from '@nx-react-native/shared/utils-suspense'
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {
  addWeeks,
  eachDayOfInterval,
  endOfWeek,
  format,
  formatISO,
  startOfToday,
  startOfWeek,
  subWeeks
} from 'date-fns'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { Alert, FlatList } from 'react-native'
import { Appbar, FAB, List } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import { ErrorScreen } from '..'
import { RootStackParamList } from '../../app'

const options: BottomTabNavigationOptions = {
  title: '',
  tabBarShowLabel: false
}

const Component = (): JSX.Element => {
  const { showActionSheetWithOptions } = useActionSheet()
  const { t } = useTranslation('HabitsScreen')
  const [periodStartDate, setPeriodStartDate] = useState<Date>(
    startOfWeek(startOfToday(), { weekStartsOn: 1 })
  )
  const periodEndDate = endOfWeek(periodStartDate, { weekStartsOn: 1 })
  const { setOptions, navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { data, loading, error } = useHabitsSubscription({
    variables: {
      minDate: formatISO(periodStartDate),
      maxDate: formatISO(periodEndDate)
    }
  })
  const [habitDeleteMutation] = useHabitDeleteMutation()
  const [habitActivityCreateMutation] = useHabitActivityCreateMutation()
  const [habitActivityDeleteMutation] = useHabitActivityDeleteMutation()

  useEffect(() => {
    const handlePreviousPeriod = (): void =>
      setPeriodStartDate(subWeeks(periodStartDate, 1))

    const handleNextPeriod = (): void =>
      setPeriodStartDate(addWeeks(periodStartDate, 1))

    setOptions({
      headerShown: true,
      title: t('title'),
      headerRight: () => (
        <View flex={1} flexDirection="row" paddingEnd="tight">
          <Appbar.Action
            icon="chevron-left"
            onPress={handlePreviousPeriod}
            accessibilityLabel={t('previousPeriodButtonAccessibilityLabel')}
          />
          <Appbar.Action
            icon="chevron-right"
            onPress={handleNextPeriod}
            accessibilityLabel={t('nextPeriodButtonAccessibilityLabel')}
          />
        </View>
      )
    })
  }, [t, setOptions, setPeriodStartDate, periodStartDate])

  const handleDayPress: HabitsListItemProps['onDayPress'] = useCallback(
    async ({ id, habitId, habitActivityId }) => {
      try {
        if (habitActivityId !== undefined) {
          await habitActivityDeleteMutation({
            variables: {
              filter: {
                id: [habitActivityId]
              }
            }
          })
          return Toast.show({
            type: 'success',
            text1: t('habitActivityDeletedSuccess')
          })
        }

        await habitActivityCreateMutation({
          variables: {
            input: {
              count: 1,
              date: id,
              habit: { id: habitId }
            }
          }
        })
        return Toast.show({
          type: 'success',
          text1: t('habitActivityCreatedSuccess')
        })
      } catch (_error) {
        return Alert.alert(t('errorTitle', _error.message))
      }
    },
    [habitActivityCreateMutation, habitActivityDeleteMutation, t]
  )

  if (error !== undefined) {
    throw Error(error?.message)
  }

  if (loading === true) {
    return <Suspender />
  }

  const handleCreateHabit = (): void => {
    navigate('HabitCreateScreen')
  }

  const handleHabitOptions = (id: string, name: string): void => {
    showActionSheetWithOptions(
      {
        options: [
          t('updateButtonLabel'),
          t('deleteButtonLabel'),
          t('cancelButtonLabel')
        ],
        cancelButtonIndex: 2,
        destructiveButtonIndex: 1
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          return navigate('HabitUpdateScreen', { id, name })
        }

        if (buttonIndex === 1) {
          try {
            await habitDeleteMutation({
              variables: {
                filter: {
                  id: [id]
                }
              }
            })
            return Alert.alert(t('deleteSuccess'))
          } catch (_error) {
            return Alert.alert(t('errorTitle', _error.message))
          }
        }
      }
    )
  }

  const mappedData = filterNullable(data?.queryHabit ?? []).map((_item) => {
    const weekData = eachDayOfInterval({
      start: periodStartDate,
      end: periodEndDate
    }).map((_date) => {
      const activity = _item?.habitActivities?.find((_activity) => {
        return _activity.date.substring(0, 10) === format(_date, 'yyyy-MM-dd')
      })

      return {
        date: _date,
        count: activity?.count ?? 0,
        habitActivityId: activity?.id,
        habitId: _item.id
      }
    })

    return {
      ..._item,
      weekData
    }
  })

  return (
    <Screen>
      <FlatList
        ListHeaderComponent={
          <List.Subheader>
            {formatDateRange(periodStartDate, periodEndDate)}
          </List.Subheader>
        }
        ListEmptyComponent={<Text>{t('emptyData')}</Text>}
        data={mappedData}
        renderItem={({ item }) => {
          return (
            <HabitsListItem
              item={item}
              onDayPress={handleDayPress}
              onItemPress={handleHabitOptions}
            />
          )
        }}
      />
      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0
        }}
        icon="plus"
        accessibilityLabel={t('createHabitButtonAccessibilityLabel')}
        onPress={handleCreateHabit}
      />
    </Screen>
  )
}

const Container = (): JSX.Element => {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorScreen
          testID="HabitsScreenError"
          error={error}
          resetErrorBoundary={resetErrorBoundary}
        />
      )}>
      <Suspense
        fallback={
          <Screen testID="HabitsScreenSkeleton">
            <HabitsListSkeleton />
          </Screen>
        }>
        <Screen testID="HabitsScreen">
          <Component />
        </Screen>
      </Suspense>
    </ErrorBoundary>
  )
}

export const HabitsScreen = {
  Container,
  options
}
