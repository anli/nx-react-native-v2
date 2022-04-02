import { yupResolver } from '@hookform/resolvers/yup'
import { GroupFormSkeleton } from '@nx-react-native/habit/ui'
import { Button, FormTextInput, Screen, View } from '@nx-react-native/shared/ui'
import { useHeaderHeight } from '@react-navigation/elements'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp
} from '@react-navigation/native-stack'
import React, { Suspense, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { KeyboardAvoidingView, Platform } from 'react-native'
import * as yup from 'yup'
import { RootStackParamList } from '../../app'

const options: NativeStackNavigationOptions = {
  title: ''
}

interface FormData {
  email: string
}

const Component = (): JSX.Element => {
  const headerHeight = useHeaderHeight()
  const { t } = useTranslation('UserSelectScreen')
  const schema = yup
    .object({
      email: yup
        .string()
        .email(t('emailInputValidationEmail'))
        .required(t('emailInputValidationRequired'))
    })
    .required()
  const { setOptions, navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const {
    params: { nextScreen }
  } = useRoute<RouteProp<RootStackParamList, 'UserSelectScreen'>>()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    setOptions({
      title: t('title')
    })
  })

  const handleSelect = (data: FormData): void => {
    // @ts-expect-error
    navigate({
      name: nextScreen,
      params: { userSelectEmail: data.email },
      merge: true
    })
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
        <View paddingHorizontal="extraLoose" paddingTop="extraLoose" flex={1}>
          <FormTextInput<FormData>
            control={control}
            testID="EmailInput"
            accessibilityLabel={t('emailInputAccessibilityLabel')}
            label={t('emailInputLabel')}
            name="email"
            error={errors.email}
            textInputProps={{
              keyboardType: 'email-address',
              autoCapitalize: 'none'
            }}
          />
        </View>
        <View padding="extraLoose">
          <Button
            testID="SubmitButton"
            accessibilityLabel={t('buttonAccessibilityLabel')}
            borderRadius="extraLoose"
            padding="tight"
            mode="contained"
            onPress={handleSubmit(handleSelect)}>
            {t('buttonTitle')}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  )
}

const Container = (): JSX.Element => {
  return (
    <Suspense
      fallback={
        <Screen testID="UserSelectScreenSkeleton">
          <GroupFormSkeleton />
        </Screen>
      }>
      <Screen testID="UserSelectScreen">
        <Component />
      </Screen>
    </Suspense>
  )
}

export const UserSelectScreen = {
  Container,
  options
}
