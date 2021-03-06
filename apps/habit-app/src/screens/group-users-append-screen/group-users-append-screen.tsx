import { yupResolver } from '@hookform/resolvers/yup'
import { UserForm, UserFormData } from '@nx-react-native/habit/ui'
import { Screen, SkeletonPlaceholderScreen } from '@nx-react-native/shared/ui'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import React, { Suspense, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import * as yup from 'yup'
import { RootStackParamList } from '../../app'
import { useSetAdminUserMutation } from './group-users-append-screen.generated'

const options: NativeStackNavigationOptions = {
  title: ''
}

const Component = (): JSX.Element => {
  const { t } = useTranslation([
    'GroupUsersAppendScreen',
    'Global',
    'ErrorScreen'
  ])
  const schema = yup
    .object({
      email: yup
        .string()
        .required(t('emailInputValidationRequired', { ns: 'Global' }))
        .email(t('emailInputValidationEmail', { ns: 'Global' }))
    })
    .required()
  const { setOptions, canGoBack, goBack } = useNavigation()
  const {
    params: { id }
  } = useRoute<RouteProp<RootStackParamList, 'GroupUsersAppendScreen'>>()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UserFormData>({
    resolver: yupResolver(schema)
  })
  const [setAdminUserMutation, { loading }] = useSetAdminUserMutation()

  useEffect(() => {
    setOptions({
      title: t('title'),
      headerShown: true
    })
  }, [setOptions, t])

  const handleSetAdminUserButton = async (
    data: UserFormData
  ): Promise<void> => {
    try {
      const response = await setAdminUserMutation({
        variables: {
          id,
          email: data.email
        }
      })

      if (response?.data?.updateGroup == null) {
        throw new Error(t('errorUserDoesNotExist', { ns: 'ErrorScreen' }))
      }

      canGoBack() && goBack()
      return
    } catch (error) {
      return Alert.alert(t('errorTitle', { ns: 'ErrorScreen' }), error.message)
    }
  }

  return (
    <UserForm
      control={control}
      loading={loading}
      onPress={handleSubmit(handleSetAdminUserButton)}
      errors={errors}
      emailInputAccessibilityLabel={t('emailInputAccessibilityLabel', {
        ns: 'Global'
      })}
      emailInputLabel={t('emailInputLabel', { ns: 'Global' })}
      buttonAccessibilityLabel={t('buttonAccessibilityLabel')}
      buttonTitle={t('buttonTitle')}
    />
  )
}

const Container = (): JSX.Element => {
  return (
    <Suspense
      fallback={
        <SkeletonPlaceholderScreen testID="GroupUsersAppendScreenSkeleton" />
      }>
      <Screen testID="GroupUsersAppendScreen">
        <Component />
      </Screen>
    </Suspense>
  )
}

export const GroupUsersAppendScreen = {
  Container,
  options
}
