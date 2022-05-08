import {
  Screen,
  SkeletonPlaceholderScreen,
  Text
} from '@nx-react-native/shared/ui'
import { filterNullable } from '@nx-react-native/shared/utils'
import { useApolloResult } from '@nx-react-native/shared/utils-apollo-provider'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native'
import { List } from 'react-native-paper'
import { RootStackParamList } from '../../app'
import { ErrorScreen } from '../error-screen'
import { useGroupsQuery } from './group-select-screen.generated'

const options = {
  title: ''
}

const Component = (): JSX.Element => {
  const { t } = useTranslation(['GroupSelectScreen', 'Global'])
  const { setOptions, navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const {
    params: { nextScreenName }
  } = useRoute<RouteProp<RootStackParamList, 'GroupSelectScreen'>>()
  const { data: _data } = useApolloResult(useGroupsQuery())
  const data = filterNullable(_data?.queryGroup ?? [])

  useEffect(() => {
    setOptions({
      headerShown: true,
      title: t('title')
    })
  }, [t, setOptions])

  const handlePress = (id: string): void => {
    navigate({
      name: nextScreenName,
      params: { groupSelectScreen: { id } },
      merge: true
    })
  }

  return (
    <Screen>
      <FlatList
        ListEmptyComponent={<Text>{t('emptyData', { ns: 'Global' })}</Text>}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const _handlePress = (): void => handlePress(item.id)
          return <List.Item title={item.name} onPress={_handlePress} />
        }}
      />
    </Screen>
  )
}

const Container = (): JSX.Element => {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorScreen
          testID="GroupSelectScreenError"
          error={error}
          resetErrorBoundary={resetErrorBoundary}
        />
      )}>
      <Suspense
        fallback={
          <SkeletonPlaceholderScreen testID="GroupSelectScreenSkeleton" />
        }>
        <Screen testID="GroupSelectScreen">
          <Component />
        </Screen>
      </Suspense>
    </ErrorBoundary>
  )
}

export const GroupSelectScreen = {
  Container,
  options
}
