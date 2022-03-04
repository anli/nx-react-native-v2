import { Button, Screen, Text, View } from '@nx-react-native/shared/ui'
import { useNavigation } from '@react-navigation/native'
import React, { Suspense, useEffect } from 'react'
import { FallbackProps } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { Login } from '../login-screen/ui'

export const Component: React.ComponentType<FallbackProps> = ({
  error,
  resetErrorBoundary
}) => {
  const { t } = useTranslation('ErrorScreen')
  const { setOptions } = useNavigation()

  useEffect(() => {
    setOptions({
      headerShown: false
    })
  }, [setOptions])

  return (
    <>
      <View flex={1} />
      <View margin="extraLoose">
        <Text variant="largeTitleEmphasized" marginBottom="base">
          {t('title')}
        </Text>
        <Text marginBottom="base" variant="body" textAlign="justify">
          {error.message}
        </Text>
        <Button
          testID="ErrorScreen.Button"
          borderRadius="extraLoose"
          padding="tight"
          mode="contained"
          onPress={resetErrorBoundary}>
          {t('buttonTitle')}
        </Button>
      </View>
    </>
  )
}

const Skeleton = Login.Skeleton

export const ErrorScreen: React.ComponentType<
FallbackProps & { testID?: string }
> = ({ testID = 'ErrorScreen', error, resetErrorBoundary }) => {
  return (
    <Suspense
      fallback={
        <Screen testID="ErrorScreenSkeleton">
          <Skeleton />
        </Screen>
      }>
      <Screen testID={testID}>
        <Component error={error} resetErrorBoundary={resetErrorBoundary} />
      </Screen>
    </Suspense>
  )
}
