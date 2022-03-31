import {
  useGroupQuery,
  useGroupUpdateMutation
} from '@nx-react-native/habit/data-access'
import {
  GroupForm,
  GroupFormData,
  GroupFormSkeleton
} from '@nx-react-native/habit/ui'
import { Screen } from '@nx-react-native/shared/ui'
import { Suspender } from '@nx-react-native/shared/utils-suspense'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import React, { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import { RootStackParamList } from '../../app'
import { ErrorScreen } from '../error-screen'

const options: NativeStackNavigationOptions = {
  title: ''
}

const Component = (): JSX.Element => {
  const { t } = useTranslation([
    'GroupUpdateScreen',
    'GroupForm',
    'ErrorScreen'
  ])
  const { setOptions, canGoBack, goBack } = useNavigation()
  const {
    params: { id }
  } = useRoute<RouteProp<RootStackParamList, 'GroupUpdateScreen'>>()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<GroupFormData>()
  const [groupUpdateMutation, { loading: updateLoading }] =
    useGroupUpdateMutation()
  const {
    data: _data,
    loading: queryLoading,
    error
  } = useGroupQuery({
    variables: {
      id
    }
  })
  const defaultValues = _data?.getGroup

  useEffect(() => {
    reset({
      name: defaultValues?.name ?? '',
      adminUsers:
        defaultValues?.adminUsers?.map((user) => ({ email: user.email })) ?? []
    })
  }, [defaultValues, id, reset])

  useEffect(() => {
    setOptions({
      title: t('title'),
      headerShown: true
    })
  })

  if (error !== undefined) {
    throw Error(error?.message)
  }

  if (queryLoading === true) {
    return <Suspender />
  }

  const handleGroupUpdateButton = async (
    data: GroupFormData
  ): Promise<void> => {
    try {
      await groupUpdateMutation({
        variables: {
          input: {
            filter: { id: [id] },
            set: data
          }
        }
      })

      canGoBack() && goBack()
      return
    } catch (_error) {
      return Alert.alert(t('errorTitle', { ns: 'ErrorScreen' }), _error.message)
    }
  }

  return (
    <GroupForm
      control={control}
      loading={updateLoading}
      onPress={handleSubmit(handleGroupUpdateButton)}
      errors={errors}
      nameInputValidationRequired={`${t('nameInputValidationRequired', {
        ns: 'GroupForm'
      })}`}
      nameInputAccessibilityLabel={t('nameInputAccessibilityLabel', {
        ns: 'GroupForm'
      })}
      nameInputLabel={t('nameInputLabel', { ns: 'GroupForm' })}
      buttonAccessibilityLabel={t('buttonAccessibilityLabel')}
      buttonTitle={t('buttonTitle')}
    />
  )
}

const Container = (): JSX.Element => {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorScreen
          testID="GroupUpdateScreenError"
          error={error}
          resetErrorBoundary={resetErrorBoundary}
        />
      )}>
      <Suspense
        fallback={
          <Screen testID="GroupUpdateScreenSkeleton">
            <GroupFormSkeleton />
          </Screen>
        }>
        <Screen testID="GroupUpdateScreen">
          <Component />
        </Screen>
      </Suspense>
    </ErrorBoundary>
  )
}

export const GroupUpdateScreen = {
  Container,
  options
}
