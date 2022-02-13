import { Screen } from '@nx-react-native/shared/ui'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import React, { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { RootStackParamList } from '../../app'
import { Login } from './ui'

// const useSomething = () => {
//   throw new Promise(() => {
//     return true
//   })
// }

const Component = (): JSX.Element => {
  const { navigate } =
    useNavigation<NavigationProp<RootStackParamList, 'LoginScreen'>>()
  const { t } = useTranslation('LoginScreen')

  // useSomething()

  const handleLogin = (): void => {
    navigate('AppTabs')
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
