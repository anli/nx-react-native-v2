import {
  useGroupDeleteMutation,
  useGroupSubscription
} from '@nx-react-native/habit/data-access'
import { HabitsListSkeleton } from '@nx-react-native/habit/ui'
import { Screen, Text, View } from '@nx-react-native/shared/ui'
import { Suspender } from '@nx-react-native/shared/utils-suspense'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import { Appbar, List } from 'react-native-paper'
import { RootStackParamList } from '../../app'
import { ErrorScreen } from '../error-screen'

const options = {
  title: ''
}

const Component = (): JSX.Element => {
  const { t } = useTranslation('GroupViewScreen')
  const { setOptions, canGoBack, goBack, navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const {
    params: { id }
  } = useRoute<RouteProp<RootStackParamList, 'GroupViewScreen'>>()
  const {
    data: _data,
    loading,
    error
  } = useGroupSubscription({
    variables: {
      id
    }
  })
  const [groupDeleteMutation] = useGroupDeleteMutation()
  const data = _data?.getGroup

  useEffect(() => {
    const handleUpdate = (): void => navigate('GroupUpdateScreen', { id })

    const handleDelete = async (): Promise<void> => {
      await groupDeleteMutation({
        variables: {
          filter: {
            id: [id]
          }
        }
      })

      canGoBack() && goBack()
    }

    const handleDeleteConfirmation = (): void => {
      Alert.alert(
        t('deleteConfirmationTitle'),
        t('deleteConfirmationMessage'),
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Delete',
            onPress: handleDelete,
            style: 'destructive'
          }
        ]
      )
    }

    setOptions({
      headerShown: true,
      title: data?.name ?? '',
      headerRight: () => (
        <>
          <Appbar.Action
            icon="pencil"
            onPress={handleUpdate}
            accessibilityLabel={t('updateButtonAccessibilityLabel')}
          />
          <Appbar.Action
            icon="trash-can"
            onPress={handleDeleteConfirmation}
            accessibilityLabel={t('deleteButtonAccessibilityLabel')}
          />
        </>
      )
    })
  }, [
    canGoBack,
    data?.name,
    goBack,
    groupDeleteMutation,
    id,
    navigate,
    setOptions,
    t
  ])

  if (error !== undefined) {
    throw Error(error?.message)
  }

  if (loading === true) {
    return <Suspender />
  }

  const handleViewUsers = (): void => navigate('GroupUsersScreen', { id })

  return (
    <Screen>
      <List.Item
        accessibilityLabel={t('usersButtonAccessibilityLabel')}
        onPress={handleViewUsers}
        title={t('usersTitle')}
        left={(props) => <List.Icon {...props} icon="account-box" />}
        right={(props) => (
          <>
            <View justifyContent="center">
              <Text>{data?.adminUsersAggregate?.count}</Text>
            </View>
            <List.Icon {...props} icon="chevron-right" />
          </>
        )}
      />
    </Screen>
  )
}

const Container = (): JSX.Element => {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorScreen
          testID="GroupViewScreenError"
          error={error}
          resetErrorBoundary={resetErrorBoundary}
        />
      )}>
      <Suspense
        fallback={
          <Screen testID="GroupViewScreenSkeleton">
            <HabitsListSkeleton />
          </Screen>
        }>
        <Screen testID="GroupViewScreen">
          <Component />
        </Screen>
      </Suspense>
    </ErrorBoundary>
  )
}

export const GroupViewScreen = {
  Container,
  options
}
