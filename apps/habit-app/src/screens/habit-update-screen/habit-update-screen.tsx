import { yupResolver } from '@hookform/resolvers/yup'
import {
  HabitForm,
  HabitFormData,
  HabitFormSkeleton
} from '@nx-react-native/habit/ui'
import { Screen } from '@nx-react-native/shared/ui'
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
  useHabitUpdateMutation,
  useHabitUpdateScreenQuery
} from './habit-update-screen.generated'

const options: NativeStackNavigationOptions = {
  title: ''
}

const Component = (): JSX.Element => {
  const { t } = useTranslation(['HabitUpdateScreen', 'Form', 'ErrorScreen'])
  const schema = yup
    .object({
      name: yup.string().required(
        t('nameInputValidationRequired', {
          ns: 'GroupForm'
        })
      )
    })
    .required()
  const { setOptions, canGoBack, goBack, navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { params } =
    useRoute<RouteProp<RootStackParamList, 'HabitUpdateScreen'>>()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<HabitFormData>({
    resolver: yupResolver(schema)
  })
  const [habitUpdateMutation, { loading }] = useHabitUpdateMutation()
  const {
    data: _data,
    loading: queryLoading,
    error: queryError
  } = useHabitUpdateScreenQuery({
    variables: { habitId: params.id },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only'
  })
  const groups = filterNullable(_data?.queryGroup ?? [])
  const defaultValues = _data?.getHabit

  useEffect(() => {
    reset({ name: defaultValues?.name, groupId: defaultValues?.group?.id })
  }, [defaultValues?.name, defaultValues?.group?.id, reset])

  useEffect(() => {
    setOptions({
      title: t('title')
    })
  }, [setOptions, t])

  useEffect(() => {
    setValue('groupId', params?.groupSelectScreen?.id)
  }, [params, setValue])

  if (queryError !== undefined) {
    throw Error(queryError?.message)
  }

  if (queryLoading === true) {
    return <Suspender />
  }

  const handleHabitUpdateButton = async (
    data: HabitFormData
  ): Promise<void> => {
    try {
      await habitUpdateMutation({
        variables: {
          input: {
            filter: { id: [params.id] },
            set: {
              name: data.name,
              ...(data.groupId !== undefined
                ? { group: { id: data.groupId } }
                : {})
            },
            remove: {
              ...(defaultValues?.group?.id != null && data.groupId == null
                ? { group: { id: defaultValues?.group?.id } }
                : {})
            }
          }
        }
      })

      canGoBack() && goBack()
      return
    } catch (error) {
      return Alert.alert(t('errorTitle', { ns: 'ErrorScreen' }), error.message)
    }
  }

  const handleSelectGroup = (): void => {
    navigate('GroupSelectScreen', { nextScreenName: 'HabitUpdateScreen' })
  }

  const handleRemoveGroup = (): void => {
    setValue('groupId', undefined)
  }

  return (
    <HabitForm
      control={control}
      loading={loading}
      onPress={handleSubmit(handleHabitUpdateButton)}
      errors={errors}
      nameInputAccessibilityLabel={t('nameInputAccessibilityLabel', {
        ns: 'Form'
      })}
      nameInputLabel={t('nameInputLabel', { ns: 'Form' })}
      buttonAccessibilityLabel={t('buttonAccessibilityLabel')}
      buttonTitle={t('buttonTitle')}
      onSelectGroup={handleSelectGroup}
      groups={groups}
      emptyGroupButtonLabel={t('emptyGroupButtonLabel', { ns: 'Form' })}
      onRemoveGroup={handleRemoveGroup}
      groupSelectButtonAccessibilityLabel={t(
        'groupSelectButtonAccessibilityLabel',
        { ns: 'Form' }
      )}
      groupRemoveButtonAccessibilityLabel={t(
        'groupRemoveButtonAccessibilityLabel',
        { ns: 'Form' }
      )}
    />
  )
}

const Container = (): JSX.Element => {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorScreen
          testID="HabitUpdateScreenError"
          error={error}
          resetErrorBoundary={resetErrorBoundary}
        />
      )}>
      <Suspense
        fallback={
          <Screen testID="HabitUpdateScreenSkeleton">
            <HabitFormSkeleton />
          </Screen>
        }>
        <Screen testID="HabitUpdateScreen">
          <Component />
        </Screen>
      </Suspense>
    </ErrorBoundary>
  )
}

export const HabitUpdateScreen = {
  Container,
  options
}
