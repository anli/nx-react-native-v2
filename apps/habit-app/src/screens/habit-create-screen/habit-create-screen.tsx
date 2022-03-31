import { useHabitCreateMutation } from '@nx-react-native/habit/data-access'
import {
  HabitForm,
  HabitFormData,
  HabitFormSkeleton
} from '@nx-react-native/habit/ui'
import { useAuth } from '@nx-react-native/shared/auth'
import { Screen } from '@nx-react-native/shared/ui'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import React, { Suspense, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'

const options: NativeStackNavigationOptions = {
  title: ''
}

const Component = (): JSX.Element => {
  const { user } = useAuth()
  const { t } = useTranslation([
    'HabitCreateScreen',
    'HabitForm',
    'ErrorScreen'
  ])
  const { setOptions, canGoBack, goBack } = useNavigation()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<HabitFormData>()
  const [habitCreateMutation, { loading }] = useHabitCreateMutation()

  useEffect(() => {
    setOptions({
      title: t('title')
    })
  })

  const handleHabitCreateButton = async (
    data: HabitFormData
  ): Promise<void> => {
    if (user != null) {
      try {
        await habitCreateMutation({
          variables: {
            input: {
              ...data,
              user: { email: user.email }
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

  return (
    <HabitForm
      control={control}
      loading={loading}
      onPress={handleSubmit(handleHabitCreateButton)}
      errors={errors}
      nameInputValidationRequired={`${t('nameInputValidationRequired', {
        ns: 'HabitForm'
      })}`}
      nameInputAccessibilityLabel={t('nameInputAccessibilityLabel', {
        ns: 'HabitForm'
      })}
      nameInputLabel={t('nameInputLabel', { ns: 'HabitForm' })}
      buttonAccessibilityLabel={t('buttonAccessibilityLabel')}
      buttonTitle={t('buttonTitle')}
    />
  )
}

const Container = (): JSX.Element => {
  return (
    <Suspense
      fallback={
        <Screen testID="HabitCreateScreenSkeleton">
          <HabitFormSkeleton />
        </Screen>
      }>
      <Screen testID="HabitCreateScreen">
        <Component />
      </Screen>
    </Suspense>
  )
}

export const HabitCreateScreen = {
  Container,
  options
}
