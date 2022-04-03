import { yupResolver } from '@hookform/resolvers/yup'
import { useGroupCreateMutation } from '@nx-react-native/habit/data-access'
import {
  getGroupFormSchema,
  GroupForm,
  GroupFormData,
  GroupFormSkeleton
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
    'GroupCreateScreen',
    'GroupForm',
    'ErrorScreen'
  ])
  const schema = getGroupFormSchema({
    nameRequired: t('nameInputValidationRequired', {
      ns: 'GroupForm'
    })
  })
  const { setOptions, canGoBack, goBack } = useNavigation()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<GroupFormData>({
    resolver: yupResolver(schema)
  })
  const [groupCreateMutation, { loading }] = useGroupCreateMutation()

  useEffect(() => {
    setOptions({
      title: t('title')
    })
  })

  const handleGroupCreateButton = async (
    data: GroupFormData
  ): Promise<void> => {
    try {
      await groupCreateMutation({
        variables: {
          input: {
            ...data,
            adminUsers: [{
              email: user?.email
            }]
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
    <GroupForm
      control={control}
      loading={loading}
      onPress={handleSubmit(handleGroupCreateButton)}
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
    <Suspense
      fallback={
        <Screen testID="GroupCreateScreenSkeleton">
          <GroupFormSkeleton />
        </Screen>
      }>
      <Screen testID="GroupCreateScreen">
        <Component />
      </Screen>
    </Suspense>
  )
}

export const GroupCreateScreen = {
  Container,
  options
}
