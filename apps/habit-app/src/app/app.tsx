import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { SafeAreaView, Text } from 'react-native'

const HomeScreen = (): React.ReactElement => {
  return (
    <SafeAreaView>
      <Text>Welcome</Text>
    </SafeAreaView>
  )
}

const Stack = createNativeStackNavigator()

export const App = (): React.ReactElement => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
)
