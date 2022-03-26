import { HabitsListSkeleton } from '@nx-react-native/habit/ui'
import { Screen } from '@nx-react-native/shared/ui'
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { RootStackParamList } from '../../app'
import { ErrorScreen } from '../error-screen'

const options: BottomTabNavigationOptions = {
  title: '',
  tabBarShowLabel: false
}

const Component = (): JSX.Element => {
  const { t } = useTranslation('GroupsScreen')
  const { setOptions } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  useEffect(() => {
    setOptions({
      headerShown: true,
      title: t('title')
    })
  }, [t, setOptions])

  return <Screen></Screen>
}

const Container = (): JSX.Element => {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorScreen
          testID="GroupsScreenError"
          error={error}
          resetErrorBoundary={resetErrorBoundary}
        />
      )}>
      <Suspense
        fallback={
          <Screen testID="GroupsScreenSkeleton">
            <HabitsListSkeleton />
          </Screen>
        }>
        <Screen testID="GroupsScreen">
          <Component />
        </Screen>
      </Suspense>
    </ErrorBoundary>
  )
}

export const GroupsScreen = {
  Container,
  options
}
