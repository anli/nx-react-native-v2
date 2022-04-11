import { yupResolver } from '@hookform/resolvers/yup'
import { HabitForm, HabitFormData } from '@nx-react-native/habit/ui'
import { useAuth } from '@nx-react-native/shared/auth'
import { Screen, SkeletonPlaceholderScreen } from '@nx-react-native/shared/ui'
import { filterNullable } from '@nx-react-native/shared/utils'
import { Suspender } from '@nx-react-native/shared/utils-suspense'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp
} from '@react-navigation/native-stack'
import React, { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import * as yup from 'yup'
import { RootStackParamList } from '../../app'
import { ErrorScreen } from '../error-screen'
import {
  useHabitCreateMutation,
  useHabitCreateScreenQuery
} from './habit-create-screen.generated'

const options: NativeStackNavigationOptions = {
  title: ''
}

const Component = (): JSX.Element => {
  const { user } = useAuth()
  const { t } = useTranslation(['HabitCreateScreen', 'Global', 'ErrorScreen'])
  const schema = yup.object({
    name: yup.string().required(
      t('nameInputValidationRequired', {
        ns: 'Global'
      })
    )
  })
  const { setOptions, canGoBack, goBack, navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { params } =
    useRoute<RouteProp<RootStackParamList, 'HabitCreateScreen'>>()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<HabitFormData>({
    resolver: yupResolver(schema)
  })
  const [habitCreateMutation, { loading }] = useHabitCreateMutation()
  const {
    data: _data,
    loading: queryLoading,
    error: queryError
  } = useHabitCreateScreenQuery()
  const groups = filterNullable(_data?.queryGroup ?? [])

  useEffect(() => {
    setOptions({
      title: t('title')
    })
  }, [setOptions, t])

  useEffect(() => {
    setValue('groupId', params?.groupSelectScreen?.id)
  }, [params, reset, setValue])

  if (queryError !== undefined) {
    throw Error(queryError?.message)
  }

  if (queryLoading === true) {
    return <Suspender />
  }

  const handleHabitCreateButton = async (
    data: HabitFormData
  ): Promise<void> => {
    if (user != null) {
      try {
        await habitCreateMutation({
          variables: {
            input: {
              name: data.name,
              user: { email: user.email },
              ...(data.groupId !== undefined
                ? { group: { id: data.groupId } }
                : {})
            }
          }
        })
        canGoBack() && goBack()
        return
      } catch (error) {
        return Alert.alert(
          t('errorTitle', { ns: 'ErrorScreen' }),
          error.message
        )
      }
    }

    return Alert.alert(t('errorTitle', { ns: 'ErrorScreen' }), 'user is null')
  }

  const handleSelectGroup = (): void => {
    navigate('GroupSelectScreen', { nextScreenName: 'HabitCreateScreen' })
  }

  const handleRemoveGroup = (): void => {
    setValue('groupId', undefined)
  }

  return (
    <HabitForm
      control={control}
      loading={loading}
      onPress={handleSubmit(handleHabitCreateButton)}
      errors={errors}
      nameInputAccessibilityLabel={t('nameInputAccessibilityLabel', {
        ns: 'Global'
      })}
      nameInputLabel={t('nameInputLabel', { ns: 'Global' })}
      buttonAccessibilityLabel={t('buttonAccessibilityLabel')}
      buttonTitle={t('buttonTitle')}
      onSelectGroup={handleSelectGroup}
      groups={groups}
      emptyGroupButtonLabel={t('emptyGroupButtonLabel', { ns: 'Global' })}
      onRemoveGroup={handleRemoveGroup}
      groupSelectButtonAccessibilityLabel={t(
        'groupSelectButtonAccessibilityLabel',
        { ns: 'Global' }
      )}
      groupRemoveButtonAccessibilityLabel={t(
        'groupRemoveButtonAccessibilityLabel',
        { ns: 'Global' }
      )}
    />
  )
}

const Container = (): JSX.Element => {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorScreen
          testID="HabitCreateScreenError"
          error={error}
          resetErrorBoundary={resetErrorBoundary}
        />
      )}>
      <Suspense
        fallback={
          <SkeletonPlaceholderScreen testID="HabitCreateScreenSkeleton" />
        }>
        <Screen testID="HabitCreateScreen">
          <Component />
        </Screen>
      </Suspense>
    </ErrorBoundary>
  )
}

export const HabitCreateScreen = {
  Container,
  options
}
