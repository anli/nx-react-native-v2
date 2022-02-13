import { Screen } from '@nx-react-native/shared/ui'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import React from 'react'
import { RootStackParamList } from '../../app'
import { Login } from './ui'

const Component = (): JSX.Element => {
  const { navigate } =
    useNavigation<NavigationProp<RootStackParamList, 'LoginScreen'>>()

  const handleLogin = (): void => {
    navigate('AppTabs')
  }

  return (
    <Login
      title="Login title"
      subtitle="Login subtitle"
      buttonTitle="Login"
      buttonAccessibilityLabel="Login Button"
      onPress={handleLogin}
    />
  )
}

const Container = (): JSX.Element => {
  return (
    <Screen testID="LoginScreen">
      <Component />
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
