import { useAuth } from '@nx-react-native/shared/auth'
import { Screen } from '@nx-react-native/shared/ui'
import React, { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Login } from './ui'

const Component = (): JSX.Element => {
  const { t } = useTranslation('LoginScreen')
  const { login } = useAuth()

  const handleLogin = async (): Promise<void> => {
    await login?.()
  }

  return (
    <Login.Component
      title={t('title')}
      subtitle={t('subtitle')}
      buttonTitle={t('buttonTitle')}
      buttonAccessibilityLabel={t('buttonLabel')}
      onPress={handleLogin}
    />
  )
}

const Container = (): JSX.Element => {
  return (
    <Suspense
      fallback={
        <Screen testID="LoginScreenSkeleton">
          <Login.Skeleton />
        </Screen>
      }>
      <Screen testID="LoginScreen">
        <Component />
      </Screen>
    </Suspense>
  )
}

const options = {
  headerShown: false
}

export const LoginScreen = {
  Container,
  options
}
