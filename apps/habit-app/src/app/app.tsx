/* eslint-disable multiline-ternary */
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { AuthProvider, useAuth } from '@nx-react-native/shared/auth'
import { init as I18nInit } from '@nx-react-native/shared/i18n'
import { TabBarIcon, ThemeProvider } from '@nx-react-native/shared/ui'
import { ApolloProvider } from '@nx-react-native/shared/utils-apollo-provider'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Auth0 from 'react-native-auth0'
import Config from 'react-native-config'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import {
  HabitCreateScreen,
  HabitsScreen,
  LoginScreen,
  ProfileScreen
} from '../screens'
import { HabitUpdateScreen } from '../screens/habit-update-screen'

void I18nInit({ loadPath: Config.I18N_URL, useSuspense: true })

const auth0 = new Auth0({
  domain: Config.AUTHENTICATION_DOMAIN,
  clientId: Config.AUTHENTICATION_CLIENT_ID
})

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackParamList = {
  AppTabs: undefined
  LoginScreen: undefined
  HabitsScreen: undefined
  HabitCreateScreen: undefined
  HabitUpdateScreen: { id: string, name: string }
}

const RootStack = createNativeStackNavigator<RootStackParamList>()

const Tab = createBottomTabNavigator()

export const AppTabs = (): JSX.Element => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HabitsScreen"
        component={HabitsScreen.Container}
        options={{
          ...HabitsScreen.options,
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="home-variant" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen.Container}
        options={{
          ...ProfileScreen.options,
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="account-circle" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

const Navigation = (): JSX.Element => {
  const { user, idToken } = useAuth()
  const isAuthenticated = Boolean(user)

  return (
    <ApolloProvider url={Config.GRAPHQL_URL} authToken={idToken}>
      <NavigationContainer>
        <RootStack.Navigator>
          {isAuthenticated ? (
            <>
              <RootStack.Screen
                name="AppTabs"
                component={AppTabs}
                options={{ headerShown: false }}
              />
              <RootStack.Screen
                name="HabitCreateScreen"
                component={HabitCreateScreen.Container}
                options={HabitCreateScreen.options}
              />
              <RootStack.Screen
                name="HabitUpdateScreen"
                component={HabitUpdateScreen.Container}
                options={HabitUpdateScreen.options}
              />
            </>
          ) : (
            <RootStack.Screen
              name="LoginScreen"
              component={LoginScreen.Container}
              options={LoginScreen.options}
            />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  )
}

export const App = (): JSX.Element => (
  <>
    <ThemeProvider mode="light">
      <PaperProvider theme={DefaultTheme}>
        <AuthProvider client={auth0}>
          <ActionSheetProvider>
            <Navigation />
          </ActionSheetProvider>
        </AuthProvider>
      </PaperProvider>
    </ThemeProvider>
    <Toast />
  </>
)
