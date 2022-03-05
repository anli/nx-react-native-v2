import { useAuth } from '@nx-react-native/shared/auth'
import { Screen } from '@nx-react-native/shared/ui'
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { endOfWeek, formatISO, startOfToday, startOfWeek } from 'date-fns'
import React, { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { FlatList } from 'react-native'
import { List } from 'react-native-paper'
import { ErrorScreen } from '..'
import { useHabitsSubscription } from '../../data-access'
import { Suspender } from '../../utils/suspender'
import { HabitsList } from './ui'

const options: BottomTabNavigationOptions = {
  title: ''
}

const Component = (): JSX.Element => {
  const periodStartDate = startOfWeek(startOfToday(), { weekStartsOn: 1 })
  const periodEndDate = endOfWeek(periodStartDate, { weekStartsOn: 1 })
  const { setOptions } = useNavigation()
  const { data, loading, error } = useHabitsSubscription({
    variables: {
      minDate: formatISO(periodStartDate),
      maxDate: formatISO(periodEndDate)
    }
  })

  useEffect(() => {
    setOptions(options)
  }, [setOptions])

  if (error !== undefined) {
    throw Error(error?.message)
  }

  if (loading === true) {
    return <Suspender />
  }

  return (
    <Screen>
      <FlatList
        data={data?.queryHabit}
        renderItem={({ item }) => {
          return <List.Item title={item?.name} />
        }}
      />
    </Screen>
  )
}

const Container = (): JSX.Element => {
  const { logout } = useAuth()

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorScreen
          testID="HabitsScreenError"
          error={error}
          resetErrorBoundary={resetErrorBoundary}
        />
      )}
      onReset={() => {
        logout?.()
      }}>
      <Suspense
        fallback={
          <Screen testID="HabitsScreenSkeleton">
            <HabitsList.Skeleton />
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
