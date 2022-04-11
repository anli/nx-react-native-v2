import {
  Screen,
  SkeletonPlaceholderScreen,
  Text
} from '@nx-react-native/shared/ui'
import { filterNullable } from '@nx-react-native/shared/utils'
import { Suspender } from '@nx-react-native/shared/utils-suspense'
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native'
import { FAB, List } from 'react-native-paper'
import { RootStackParamList } from '../../app'
import { ErrorScreen } from '../error-screen'
import { useGroupsScreenSubscription } from './groups-screen.generated'

const options: BottomTabNavigationOptions = {
  title: '',
  tabBarShowLabel: false
}

const Component = (): JSX.Element => {
  const { t } = useTranslation(['GroupsScreen', 'Global'])
  const { setOptions, navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { data, loading, error } = useGroupsScreenSubscription()
  const mappedData = filterNullable(data?.queryGroup ?? [])

  useEffect(() => {
    setOptions({
      headerShown: true,
      title: t('title')
    })
  }, [t, setOptions])

  if (error !== undefined) {
    throw Error(error?.message)
  }

  if (loading === true) {
    return <Suspender />
  }

  const handleCreate = (): void => navigate('GroupCreateScreen')

  const handleView = (id: string): void => navigate('GroupViewScreen', { id })

  return (
    <Screen>
      <FlatList
        ListEmptyComponent={<Text>{t('emptyData', { ns: 'Global' })}</Text>}
        data={mappedData}
        renderItem={({ item }) => {
          const _handleView = (): void => handleView(item.id)
          return <List.Item title={item.name} onPress={_handleView} />
        }}
      />
      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0
        }}
        icon="account-multiple-plus"
        accessibilityLabel={t('createButtonAccessibilityLabel')}
        onPress={handleCreate}
      />
    </Screen>
  )
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
        fallback={<SkeletonPlaceholderScreen testID="GroupsScreenSkeleton" />}>
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
