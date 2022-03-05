import { useActionSheet } from '@expo/react-native-action-sheet'
import { useAuth } from '@nx-react-native/shared/auth'
import { Screen, Text } from '@nx-react-native/shared/ui'
import { useNavigation } from '@react-navigation/native'
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp
} from '@react-navigation/native-stack'
import { endOfWeek, formatISO, startOfToday, startOfWeek } from 'date-fns'
import React, { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { Alert, FlatList } from 'react-native'
import { FAB, List } from 'react-native-paper'
import { ErrorScreen } from '..'
import { RootStackParamList } from '../../app'
import { useHabitDeleteMutation, useHabitsSubscription } from '../../habit'
import { filterNullable } from '../../utils/filter-nullable'
import { Suspender } from '../../utils/suspender'
import { HabitsList } from './ui'

const options: NativeStackNavigationOptions = {
  title: ''
}

const Component = (): JSX.Element => {
  const { showActionSheetWithOptions } = useActionSheet()
  const { t } = useTranslation('HabitsScreen')
  const periodStartDate = startOfWeek(startOfToday(), { weekStartsOn: 1 })
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

  useEffect(() => {
    setOptions({
      title: t('title')
    })
  })

  if (error !== undefined) {
    throw Error(error?.message)
  }

  if (loading === true) {
    return <Suspender />
  }

  const handleCreateHabit = (): void => {
    navigate('HabitCreateScreen')
  }

  const handleHabitOptions = (id: string): void => {
    showActionSheetWithOptions(
      {
        options: [t('deleteButtonLabel'), t('cancelButtonLabel')],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
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

  return (
    <Screen>
      <FlatList
        ListEmptyComponent={<Text>{t('emptyData')}</Text>}
        data={filterNullable(data?.queryHabit ?? [])}
        renderItem={({ item }) => {
          return (
            <List.Item
              onPress={() => handleHabitOptions(item.id)}
              title={item.name}
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
