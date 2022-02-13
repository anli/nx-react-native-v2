import { Screen, Text, View } from '@nx-react-native/shared/ui'
import React from 'react'

const Component = (): JSX.Element => {
  return (
    <Screen>
      <View>
        <Text>Welcome</Text>
      </View>
    </Screen>
  )
}

const Container = (): JSX.Element => {
  return (
    <Screen testID="HomeScreen">
      <Component />
    </Screen>
  )
}

const options = {}

export const HomeScreen = {
  Container,
  options
}
