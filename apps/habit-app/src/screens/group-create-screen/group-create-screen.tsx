import { yupResolver } from '@hookform/resolvers/yup'
import {
  getGroupFormSchema,
  GroupForm,
  GroupFormData
} from '@nx-react-native/habit/ui'
import { useAuth } from '@nx-react-native/shared/auth'
import { Screen, SkeletonPlaceholderScreen } from '@nx-react-native/shared/ui'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import React, { Suspense, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import { useGroupCreateScreenAddMutation } from './group-create-screen.generated'

const options: NativeStackNavigationOptions = {
  title: ''
}

const Component = (): JSX.Element => {
  const { user } = useAuth()
  const { t } = useTranslation(['GroupCreateScreen', 'Global', 'ErrorScreen'])
  const schema = getGroupFormSchema({
    nameRequired: t('nameInputValidationRequired', {
      ns: 'Global'
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
  const [groupCreateMutation, { loading }] = useGroupCreateScreenAddMutation()

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
            adminUsers: [
              {
                email: user?.email
              }
            ]
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
    <Suspense
      fallback={
        <SkeletonPlaceholderScreen testID="GroupCreateScreenSkeleton" />
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
