import { useAuth } from '@nx-react-native/shared/auth'
import { Screen } from '@nx-react-native/shared/ui'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Login } from './ui'

const Container = (): JSX.Element => {
  const { t } = useTranslation('LoginScreen')
  const { login } = useAuth()

  const handleLogin = async (): Promise<void> => {
    await login?.()
  }

  return (
    <Screen testID="LoginScreen">
      <Login.Component
        title={t('title')}
        subtitle={t('subtitle')}
        buttonTitle={t('buttonTitle')}
        buttonAccessibilityLabel={t('buttonLabel')}
        onPress={handleLogin}
      />
    </Screen>
  )
}

const options = {
  headerShown: false
}

export const LoginScreen = {
  Container,
  options
}
