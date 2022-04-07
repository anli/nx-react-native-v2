import { HabitsListSkeleton } from '@nx-react-native/habit/ui'
import { useAuth } from '@nx-react-native/shared/auth'
import { Screen } from '@nx-react-native/shared/ui'
import { Suspender } from '@nx-react-native/shared/utils-suspense'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { Suspense, useCallback, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { Alert, FlatList, Pressable } from 'react-native'
import { Appbar, List } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import { RootStackParamList } from '../../app'
import { ErrorScreen } from '../error-screen'
import {
  useGroupUsersScreenSubscription,
  useRemoveAdminUserMutation
} from './group-users-screen.generated'

const options = {
  title: ''
}

const Component = (): JSX.Element => {
  const { t } = useTranslation('GroupUsersScreen')
  const { user } = useAuth()
  const { setOptions, navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const {
    params: { id }
  } = useRoute<RouteProp<RootStackParamList, 'GroupUsersScreen'>>()
  const {
    data: _data,
    loading: groupUsersScreenSubscriptionLoading,
    error: groupUsersScreenSubscriptionError
  } = useGroupUsersScreenSubscription({
    variables: { id }
  })
  const [
    removeAdminUserMutation,
    {
      loading: removeAdminUserMutationLoading,
      error: removeAdminUserMutationError
    }
  ] = useRemoveAdminUserMutation()
  const data = _data?.getGroup?.adminUsers

  useEffect(() => {
    const handleAddUser = (): void => navigate('GroupUsersAppendScreen', { id })

    setOptions({
      headerShown: true,
      title: t('title'),
      headerRight: () => (
        <Appbar.Action
          icon="account-plus"
          onPress={handleAddUser}
          accessibilityLabel={t('addUserButtonAccessibilityLabel')}
        />
      )
    })
  }, [id, navigate, setOptions, t])

  const handleRemoveAdminUser = useCallback(
    (email: string): void => {
      Alert.alert(t('removeAdminUserConfirmationTitle'), undefined, [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            await removeAdminUserMutation({ variables: { id, email } })
            return Toast.show({
              type: 'success',
              text1: t('removeAdminUserSuccess')
            })
          }
        }
      ])
    },
    [id, removeAdminUserMutation, t]
  )

  if (
    groupUsersScreenSubscriptionError !== undefined ||
    removeAdminUserMutationError !== undefined
  ) {
    throw Error(
      groupUsersScreenSubscriptionError?.message ??
        removeAdminUserMutationError?.message
    )
  }

  if (
    groupUsersScreenSubscriptionLoading === true ||
    removeAdminUserMutationLoading === true
  ) {
    return <Suspender />
  }

  return (
    <Screen>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          const isCurrentUser = user?.email !== item.email

          return (
            <Item
              isCurrentUser={isCurrentUser}
              email={item.email}
              onPress={handleRemoveAdminUser}
              accessibilityLabel={t('deleteButtonAccessibilityLabel')}
            />
          )
        }}
        keyExtractor={(item) => item.id}
      />
    </Screen>
  )
}

const Item = React.memo(
  ({
    email,
    onPress,
    isCurrentUser,
    accessibilityLabel
  }: {
    email: string
    onPress: (email: string) => void
    isCurrentUser: boolean
    accessibilityLabel: string
  }): JSX.Element => {
    const handlePress = (): void => onPress(email)

    return (
      <List.Item
        title={email}
        right={(props) =>
          isCurrentUser && (
            <Pressable
              onPress={handlePress}
              accessibilityLabel={accessibilityLabel}>
              <List.Icon {...props} icon="trash-can" />
            </Pressable>
          )
        }
      />
    )
  }
)

const Container = (): JSX.Element => {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorScreen
          testID="GroupUsersScreenError"
          error={error}
          resetErrorBoundary={resetErrorBoundary}
        />
      )}>
      <Suspense
        fallback={
          <Screen testID="GroupUsersScreenSkeleton">
            <HabitsListSkeleton />
          </Screen>
        }>
        <Screen testID="GroupUsersScreen">
          <Component />
        </Screen>
      </Suspense>
    </ErrorBoundary>
  )
}

export const GroupUsersScreen = {
  Container,
  options
}
