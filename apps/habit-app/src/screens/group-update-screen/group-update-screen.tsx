import { yupResolver } from '@hookform/resolvers/yup'
import {
  getGroupFormSchema,
  GroupForm,
  GroupFormData,
  GroupFormSkeleton
} from '@nx-react-native/habit/ui'
import { Screen } from '@nx-react-native/shared/ui'
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
import { RootStackParamList } from '../../app'
import { ErrorScreen } from '../error-screen'
import {
  useGroupUpdateScreenQuery,
  useGroupUpdateScreenUpdateMutation
} from './group-update-screen.generated'

const options: NativeStackNavigationOptions = {
  title: ''
}

const Component = (): JSX.Element => {
  const { t } = useTranslation(['GroupUpdateScreen', 'Global', 'ErrorScreen'])
  const schema = getGroupFormSchema({
    nameRequired: t('nameInputValidationRequired', {
      ns: 'Global'
    })
  })
  const { setOptions, canGoBack, goBack } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const {
    params: { id }
  } = useRoute<RouteProp<RootStackParamList, 'GroupUpdateScreen'>>()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<GroupFormData>({
    resolver: yupResolver(schema)
  })
  const [groupUpdateMutation, { loading: updateLoading }] =
    useGroupUpdateScreenUpdateMutation()
  const {
    data: _data,
    loading: queryLoading,
    error
  } = useGroupUpdateScreenQuery({
    variables: {
      id
    }
  })
  const defaultValues = _data?.getGroup

  useEffect(() => {
    reset({
      name: defaultValues?.name ?? ''
    })
  }, [defaultValues, id, reset])

  useEffect(() => {
    setOptions({
      title: t('title'),
      headerShown: true
    })
  }, [setOptions, t])

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
      nameInputAccessibilityLabel={t('nameInputAccessibilityLabel', {
        ns: 'Global'
      })}
      nameInputLabel={t('nameInputLabel', { ns: 'Global' })}
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
