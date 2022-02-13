import { TabBarIcon, ThemeProvider } from '@nx-react-native/shared/ui'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { HomeScreen, LoginScreen } from '../screens'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackParamList = {
  AppTabs: undefined
  LoginScreen: undefined
}

const RootStack = createNativeStackNavigator<RootStackParamList>()

const Tab = createBottomTabNavigator()

export const AppTabs = (): JSX.Element => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen.Container}
        options={{
          ...HomeScreen.options,
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="home-variant" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export const App = (): JSX.Element => (
  <ThemeProvider>
    <PaperProvider>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="LoginScreen">
          <RootStack.Screen
            name="AppTabs"
            component={AppTabs}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="LoginScreen"
            component={LoginScreen.Container}
            options={LoginScreen.options}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  </ThemeProvider>
)
