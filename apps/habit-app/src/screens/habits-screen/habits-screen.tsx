import { useActionSheet } from '@expo/react-native-action-sheet'
import { HabitsListItem, HabitsListItemProps } from '@nx-react-native/habit/ui'
import { useAuth } from '@nx-react-native/shared/auth'
import { postNotification } from '@nx-react-native/shared/push-notification'
import {
  Screen,
  SkeletonPlaceholderScreen,
  Text,
  View
} from '@nx-react-native/shared/ui'
import { filterNullable, useSort } from '@nx-react-native/shared/utils'
import { useApolloResult } from '@nx-react-native/shared/utils-apollo-provider'
import { formatDateRange } from '@nx-react-native/shared/utils-date'
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import * as Sentry from '@sentry/react-native'
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
import { Alert, Vibration } from 'react-native'
import DraggableFlatList, {
  ScaleDecorator
} from 'react-native-draggable-flatlist'
import { Appbar, FAB, List } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import { ErrorScreen } from '..'
import { RootStackParamList } from '../../app'
import {
  useHabitActivityCreateMutation,
  useHabitActivityDeleteMutation,
  useHabitDeleteMutation,
  useHabitsSubscription
} from './habits-screen.generated'

const options: BottomTabNavigationOptions = {
  title: '',
  tabBarShowLabel: false
}

const Component = (): JSX.Element => {
  const { user } = useAuth()
  const { showActionSheetWithOptions } = useActionSheet()
  const { t } = useTranslation(['HabitsScreen', 'Global'])
  const [periodStartDate, setPeriodStartDate] = useState<Date>(
    startOfWeek(startOfToday(), { weekStartsOn: 1 })
  )
  const periodEndDate = endOfWeek(periodStartDate, { weekStartsOn: 1 })
  const { setOptions, navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { data } = useApolloResult(
    useHabitsSubscription({
      variables: {
        minDate: formatISO(periodStartDate),
        maxDate: formatISO(periodEndDate),
        user: user?.email
      }
    })
  )
  const [habitDeleteMutation] = useHabitDeleteMutation()
  const [habitActivityCreateMutation] = useHabitActivityCreateMutation()
  const [habitActivityDeleteMutation] = useHabitActivityDeleteMutation()
  const { set: setUserHabitSortIds, compareFn: compareUserHabitSortIds } =
    useSort('UserHabitSortIds')

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
    async ({
      id,
      habitId,
      habitActivityId,
      pushNotificationUserIds,
      habitName,
      date
    }) => {
      const transaction = Sentry.startTransaction({
        name: 'updateHabitActivity'
      })
      /* istanbul ignore next */
      Sentry.getCurrentHub().configureScope((scope) =>
        scope.setSpan(transaction)
      )

      const span = transaction.startChild({
        data:
          habitActivityId !== undefined
            ? {
                filter: {
                  id: [habitActivityId]
                }
              }
            : {
                input: {
                  count: 1,
                  date: id,
                  habit: { id: habitId }
                }
              },
        op: 'http',
        description:
          habitActivityId !== undefined
            ? 'habitActivityDeleteMutation'
            : 'habitActivityCreateMutation'
      })

      try {
        if (habitActivityId !== undefined) {
          await habitActivityDeleteMutation({
            variables: {
              filter: {
                id: [habitActivityId]
              }
            }
          })
          span.setStatus('ok')

          return Toast.show({
            type: 'success',
            text1: t('habitActivityDeletedSuccess', { ns: 'Global' })
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

        /* istanbul ignore next */
        if (
          pushNotificationUserIds != null &&
          pushNotificationUserIds.length > 0
        ) {
          await postNotification(
            habitName,
            t('habitActivityCreatedPushNotification', {
              ns: 'Global',
              date: format(date, 'iii, MMM d')
            }),
            pushNotificationUserIds
          )
        }

        return Toast.show({
          type: 'success',
          text1: t('habitActivityCreatedSuccess', { ns: 'Global' })
        })
      } catch (_error) {
        span.setStatus('unknown_error')
        return Alert.alert(t('errorTitle', _error.message, { ns: 'Global' }))
      } finally {
        span.finish()
        transaction.finish()
      }
    },
    [habitActivityCreateMutation, habitActivityDeleteMutation, t]
  )

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

  const sortedData = [...mappedData].sort(compareUserHabitSortIds)

  const handleCreateHabit = (): void => {
    navigate('HabitCreateScreen')
  }

  const handleHabitOptions = (id: string): void => {
    showActionSheetWithOptions(
      {
        options: [
          t('updateButtonLabel', { ns: 'Global' }),
          t('deleteButtonLabel', { ns: 'Global' }),
          t('cancelButtonLabel', { ns: 'Global' })
        ],
        cancelButtonIndex: 2,
        destructiveButtonIndex: 1
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          return navigate('HabitUpdateScreen', { id })
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
            return Alert.alert(t('deleteSuccess', { ns: 'Global' }))
          } catch (_error) {
            return Alert.alert(
              t('errorTitle', _error.message, { ns: 'Global' })
            )
          }
        }
      }
    )
  }

  const handleDragEnd = async ({
    data: _data
  }: {
    data: typeof mappedData
  }): Promise<void> => {
    const ids = _data.map((_item) => _item.id)
    void setUserHabitSortIds(ids)
  }

  const handleDragBegin = (): void => {
    Vibration.vibrate()
  }

  return (
    <Screen>
      <DraggableFlatList
        testID="List"
        ListHeaderComponent={
          <List.Subheader>
            {formatDateRange(periodStartDate, periodEndDate)}
          </List.Subheader>
        }
        ListEmptyComponent={<Text>{t('emptyData', { ns: 'Global' })}</Text>}
        data={sortedData}
        onDragBegin={handleDragBegin}
        onDragEnd={handleDragEnd}
        keyExtractor={(item) => item.id}
        renderItem={({ item, drag, isActive }) => {
          return (
            <ScaleDecorator activeScale={1.05}>
              <HabitsListItem
                onLongPress={drag}
                disabled={isActive}
                item={item}
                onDayPress={handleDayPress}
                onItemPress={handleHabitOptions}
              />
            </ScaleDecorator>
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
        fallback={<SkeletonPlaceholderScreen testID="HabitsScreenSkeleton" />}>
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
