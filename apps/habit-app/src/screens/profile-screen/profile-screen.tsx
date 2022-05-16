import { useAuth } from '@nx-react-native/shared/auth'
import { setExternalUserId } from '@nx-react-native/shared/push-notification'
import {
  Screen,
  SkeletonPlaceholderScreen,
  View
} from '@nx-react-native/shared/ui'
import { Storage } from '@nx-react-native/shared/utils'
import { useApolloResult } from '@nx-react-native/shared/utils-apollo-provider'
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import React, { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { List } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import { ErrorScreen } from '..'
import {
  useProfileScreenAddUserMutation,
  useProfileScreenSubscription,
  useProfileScreenUpdateUserMutation
} from './profile-screen.generated'
import { Switch } from './switch'
import { usePushNotification } from './use-push-notification'

const options: BottomTabNavigationOptions = {
  title: '',
  tabBarShowLabel: false,
  tabBarTestID: 'ProfileBottomTabButton'
}

const Component = (): JSX.Element => {
  const { logout, user: _user } = useAuth()
  const user = _user as { email: string }
  const { t } = useTranslation('ProfileScreen')
  const { setOptions } = useNavigation()
  const { data } = useApolloResult(
    useProfileScreenSubscription({
      variables: { user: user?.email }
    })
  )
  const { isLocalActive: isPushActive, localPushUserId } = usePushNotification(
    data?.getUser?.pushNotificationUserId
  )
  const [addUserMutation] = useProfileScreenAddUserMutation()
  const [updateUserMutation] = useProfileScreenUpdateUserMutation()

  useEffect(() => {
    setOptions({
      title: t('title')
    })
  }, [t, setOptions])

  const handleLogout = async (): Promise<void> => {
    logout?.()
    await Storage.clear()
  }

  const handlePushNotification = async (value: boolean): Promise<void> => {
    if (value) {
      await setExternalUserId(user?.email)
      await addUserMutation({
        variables: {
          input: {
            email: user?.email,
            pushNotificationUserId: localPushUserId
          }
        }
      })
    } else {
      await setExternalUserId()
      await updateUserMutation({
        variables: {
          patch: {
            filter: {
              email: { eq: user?.email }
            },
            remove: {
              pushNotificationUserId: ''
            }
          }
        }
      })
    }

    return Toast.show({
      type: 'success',
      text1: t('pushNotificationSuccess')
    })
  }

  const renderPushNotificationSwitch = (): JSX.Element => (
    <Switch
      disabled={localPushUserId == null}
      value={isPushActive}
      onValueChange={handlePushNotification}
      accessibilityLabel={t('pushNotificationAccessibilityLabel')}
    />
  )

  return (
    <Screen>
      <View paddingVertical="base">
        <List.Item
          title={t('pushNotificationTitle')}
          right={renderPushNotificationSwitch}
        />
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
