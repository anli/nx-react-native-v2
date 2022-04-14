import { useAuth } from '@nx-react-native/shared/auth'
import {
  Screen,
  SkeletonPlaceholderScreen,
  View
} from '@nx-react-native/shared/ui'
import { Storage } from '@nx-react-native/shared/utils'
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import React, { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { List } from 'react-native-paper'
import { ErrorScreen } from '..'

const options: BottomTabNavigationOptions = {
  title: '',
  tabBarShowLabel: false,
  tabBarTestID: 'ProfileBottomTabButton'
}

const Component = (): JSX.Element => {
  const { logout } = useAuth()
  const { t } = useTranslation('ProfileScreen')

  const { setOptions } = useNavigation()

  useEffect(() => {
    setOptions({
      title: t('title')
    })
  }, [t, setOptions])

  const handleLogout = async (): Promise<void> => {
    logout?.()
    await Storage.clear()
  }

  return (
    <Screen>
      <View paddingVertical="base">
        <List.Item
          title={t('logoutTitle')}
          onPress={handleLogout}
          accessibilityLabel={t('logoutAccessibilityLabel')}
        />
      </View>
    </Screen>
  )
}

const Container = (): JSX.Element => {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorScreen
          testID="ProfileScreenError"
          error={error}
          resetErrorBoundary={resetErrorBoundary}
        />
      )}>
      <Suspense
        fallback={<SkeletonPlaceholderScreen testID="ProfileScreenSkeleton" />}>
        <Screen testID="ProfileScreen">
          <Component />
        </Screen>
      </Suspense>
    </ErrorBoundary>
  )
}

export const ProfileScreen = {
  Container,
  options
}
