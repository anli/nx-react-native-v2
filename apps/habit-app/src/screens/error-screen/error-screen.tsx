import { useAuth } from '@nx-react-native/shared/auth'
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

type KnownError = 'TOKEN_EXPIRED' | 'UNKNOWN'

export const getErrorType = (error: Error): KnownError => {
  if (error.message.includes('unable to parse jwt token:token is expired by')) {
    return 'TOKEN_EXPIRED'
  }
  return 'UNKNOWN'
}

export const ErrorScreen: React.ComponentType<
FallbackProps & { testID?: string }
> = ({ testID = 'ErrorScreen', error, resetErrorBoundary }) => {
  const { logout, reLogin } = useAuth()

  const type = getErrorType(error)

  const handleResetErrorBoundary = async (): Promise<void> => {
    if (type === 'TOKEN_EXPIRED') {
      await reLogin?.()
    } else {
      logout?.()
    }

    resetErrorBoundary()
  }

  return (
    <Suspense
      fallback={
        <Screen testID="ErrorScreenSkeleton">
          <Skeleton />
        </Screen>
      }>
      <Screen testID={testID}>
        <Component
          error={error}
          resetErrorBoundary={handleResetErrorBoundary}
        />
      </Screen>
    </Suspense>
  )
}
