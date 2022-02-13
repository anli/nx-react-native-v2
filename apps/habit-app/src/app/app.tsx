import { Screen, Text, View } from '@nx-react-native/shared/ui'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'

const TabBarIcon = ({
  name,
  color,
  size
}: {
  name: string
  color: string
  size: number
}): JSX.Element => <Icon name={name} size={size} color={color} />

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

const Tab = createBottomTabNavigator()

export const HomeTabs = (): JSX.Element => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="home-variant" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export const App = (): JSX.Element => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
)
