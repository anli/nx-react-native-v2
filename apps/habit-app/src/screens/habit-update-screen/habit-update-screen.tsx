import { yupResolver } from '@hookform/resolvers/yup'
import { useHabitUpdateMutation } from '@nx-react-native/habit/data-access'
import {
  HabitForm,
  HabitFormData,
  HabitFormSkeleton
} from '@nx-react-native/habit/ui'
import { Screen } from '@nx-react-native/shared/ui'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import React, { Suspense, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import * as yup from 'yup'
import { RootStackParamList } from '../../app'

const options: NativeStackNavigationOptions = {
  title: ''
}

const Component = (): JSX.Element => {
  const { t } = useTranslation([
    'HabitUpdateScreen',
    'HabitForm',
    'ErrorScreen'
  ])
  const schema = yup
    .object({
      name: yup.string().required(
        t('nameInputValidationRequired', {
          ns: 'GroupForm'
        })
      )
    })
    .required()
  const { setOptions, canGoBack, goBack } = useNavigation()
  const { params: defaultValues } =
    useRoute<RouteProp<RootStackParamList, 'HabitUpdateScreen'>>()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<HabitFormData>({
    resolver: yupResolver(schema)
  })
  const [habitUpdateMutation, { loading }] = useHabitUpdateMutation()

  useEffect(() => {
    reset({ name: defaultValues?.name })
  }, [defaultValues, reset])

  useEffect(() => {
    setOptions({
      title: t('title')
    })
  })

  const handleHabitUpdateButton = async (
    data: HabitFormData
  ): Promise<void> => {
    try {
      await habitUpdateMutation({
        variables: {
          input: {
            filter: { id: [defaultValues.id] },
            set: data
          }
        }
      })

      canGoBack() && goBack()
      return
    } catch (error) {
      return Alert.alert(t('errorTitle', { ns: 'ErrorScreen' }), error.message)
    }
  }

  return (
    <HabitForm
      control={control}
      loading={loading}
      onPress={handleSubmit(handleHabitUpdateButton)}
      errors={errors}
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
        <Screen testID="HabitUpdateScreenSkeleton">
          <HabitFormSkeleton />
        </Screen>
      }>
      <Screen testID="HabitUpdateScreen">
        <Component />
      </Screen>
    </Suspense>
  )
}

export const HabitUpdateScreen = {
  Container,
  options
}
