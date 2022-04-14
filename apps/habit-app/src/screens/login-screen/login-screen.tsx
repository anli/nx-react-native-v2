import { useAuth } from '@nx-react-native/shared/auth'
import { Screen } from '@nx-react-native/shared/ui'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import { Login } from './ui'

const Container = (): JSX.Element => {
  const { t } = useTranslation(['LoginScreen', 'ErrorScreen'])
  const { login } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)

  const handleLogin = async (): Promise<void> => {
    try {
      setLoading(true)
      await login?.()
    } catch (error) {
      Alert.alert(t('errorTitle', { ns: 'ErrorScreen' }), error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Screen testID="LoginScreen">
      <Login.Component
        title={t('title')}
        subtitle={t('subtitle')}
        buttonTitle={t('buttonTitle')}
        buttonAccessibilityLabel={t('buttonLabel')}
        onPress={handleLogin}
        loading={loading}
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
