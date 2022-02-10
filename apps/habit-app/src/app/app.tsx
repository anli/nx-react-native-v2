import { Screen, Text, View } from '@nx-react-native/shared/ui'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

const HomeScreen = (): JSX.Element => {
  return (
    <Screen>
      <View>
        <Text>Welcome</Text>
      </View>
    </Screen>
  )
}

const Stack = createNativeStackNavigator()

export const App = (): JSX.Element => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
)
