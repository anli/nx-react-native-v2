import { useAuth } from '@nx-react-native/shared/auth'
import { Button, Screen, TextInput, View } from '@nx-react-native/shared/ui'
import { useHeaderHeight } from '@react-navigation/elements'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import React, { Suspense, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Alert, KeyboardAvoidingView, Platform } from 'react-native'
import { HelperText } from 'react-native-paper'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { useHabitCreateMutation } from '../../habit'

interface FormData {
  name: string
}

const options: NativeStackNavigationOptions = {
  title: ''
}

const Component = (): JSX.Element => {
  const { user } = useAuth()
  const { t } = useTranslation('HabitCreateScreen')
  const { setOptions, canGoBack, goBack } = useNavigation()
  const headerHeight = useHeaderHeight()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()
  const [habitCreateMutation, { loading }] = useHabitCreateMutation()

  useEffect(() => {
    setOptions({
      title: t('title')
    })
  })

  const handleHabitCreateButton = async (data: FormData): Promise<void> => {
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
        return Alert.alert(t('errorTitle'), error.message)
      }
    }

    return Alert.alert(t('errorTitle'), 'user is null')
  }

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.select({
          ios: 'padding',
          default: undefined
        })}
        style={{ flex: 1 }}
        keyboardVerticalOffset={headerHeight}>
        <View padding="extraLoose" flex={1}>
          <Controller
            control={control}
            rules={{
              required: `${t('nameInputValidationRequired')}`
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                accessibilityLabel={t('nameInputAccessibilityLabel')}
                label={t('nameInputLabel')}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="name"
          />
          <HelperText type="error" visible={Boolean(errors.name)}>
            {errors.name?.message}
          </HelperText>
        </View>

        <View padding="extraLoose">
          <Button
            accessibilityLabel={t('buttonAccessibilityLabel')}
            borderRadius="extraLoose"
            padding="tight"
            mode="contained"
            loading={loading}
            disabled={loading}
            onPress={handleSubmit(handleHabitCreateButton)}>
            {t('buttonTitle')}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  )
}

const Skeleton = (): JSX.Element => (
  <>
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item padding={32}>
        <SkeletonPlaceholder.Item marginBottom={16} width="100%" height={56} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>

    <View flex={1} />

    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item padding={32}>
        <SkeletonPlaceholder.Item width="100%" height={50} borderRadius={32} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  </>
)

const Container = (): JSX.Element => {
  return (
    <Suspense
      fallback={
        <Screen testID="HabitCreateScreenSkeleton">
          <Skeleton />
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
