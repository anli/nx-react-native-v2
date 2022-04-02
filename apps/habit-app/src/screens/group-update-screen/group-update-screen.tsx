import { yupResolver } from '@hookform/resolvers/yup'
import {
  useGroupQuery,
  useGroupUpdateMutation
} from '@nx-react-native/habit/data-access'
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
import { useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import { Appbar } from 'react-native-paper'
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
  const schema = getGroupFormSchema({
    nameRequired: t('nameInputValidationRequired', {
      ns: 'GroupForm'
    }),
    adminUsersEmail: t('adminUsersValidationEmail', {
      ns: 'GroupForm'
    })
  })
  const { setOptions, canGoBack, goBack, navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const {
    params: { id, userSelectEmail }
  } = useRoute<RouteProp<RootStackParamList, 'GroupUpdateScreen'>>()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<GroupFormData>({
    resolver: yupResolver(schema)
  })
  const { fields, append } = useFieldArray({
    control,
    name: 'adminUsers'
  })
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
        defaultValues?.adminUsers?.map((user) => ({
          email: user.email
        })) ?? []
    })
  }, [defaultValues, id, reset])

  /* istanbul ignore next */
  useEffect(() => {
    if (userSelectEmail !== undefined) {
      append({ email: userSelectEmail })
    }
  }, [append, userSelectEmail])

  useEffect(() => {
    const handleAddUser = (): void => {
      navigate('UserSelectScreen', {
        nextScreen: 'GroupUpdateScreen'
      })
    }

    setOptions({
      title: t('title'),
      headerShown: true,
      headerRight: () => (
        <Appbar.Action
          icon="account-plus"
          onPress={handleAddUser}
          accessibilityLabel={t('addUserButtonAccessibilityLabel')}
        />
      )
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
      fields={fields}
      loading={updateLoading}
      onPress={handleSubmit(handleGroupUpdateButton)}
      errors={errors}
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
