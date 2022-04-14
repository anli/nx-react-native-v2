/* eslint-disable multiline-ternary */
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import Heap from '@heap/react-native-heap'
import { AuthProvider, useAuth } from '@nx-react-native/shared/auth'
import { SplitProvider, useSplit } from '@nx-react-native/shared/feature-flag'
import { init as I18nInit } from '@nx-react-native/shared/i18n'
import {
  SkeletonPlaceholderScreen,
  TabBarIcon,
  ThemeProvider
} from '@nx-react-native/shared/ui'
import { ApolloProvider } from '@nx-react-native/shared/utils-apollo-provider'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SplitFactory } from '@splitsoftware/splitio-react-native'
import React, { Suspense } from 'react'
import Auth0 from 'react-native-auth0'
import Config from 'react-native-config'
import DeviceInfo from 'react-native-device-info'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import {
  GroupCreateScreen,
  GroupSelectScreen,
  GroupUpdateScreen,
  GroupUsersAppendScreen,
  GroupUsersScreen,
  GroupViewScreen,
  HabitCreateScreen,
  HabitsScreen,
  LoginScreen,
  ProfileScreen
} from '../screens'
import { GroupsScreen } from '../screens/groups-screen'
import { HabitUpdateScreen } from '../screens/habit-update-screen'
import { translations } from './../../public/locales/translations'

// KNOWN ISSUE: type error is caused by '@heap/react-native-heap'
// See https://github.com/heap/react-native-heap/issues/277
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HeapNavigationContainer = Heap.withReactNavigationAutotrack<any>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  NavigationContainer as any
)

void I18nInit({
  loadPath: Config.I18N_URL,
  useSuspense: true,
  bundledResources: translations
})

const auth0 = new Auth0({
  domain: Config.AUTHENTICATION_DOMAIN,
  clientId: Config.AUTHENTICATION_CLIENT_ID
})

const splitFactory = SplitFactory({
  core: {
    authorizationKey: Config.SPLIT_API_KEY,
    key: DeviceInfo.getUniqueId()
  }
})

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackParamList = {
  AppTabs: undefined
  LoginScreen: undefined
  HabitsScreen: undefined
  HabitCreateScreen: undefined | { groupSelectScreen?: { id: string } }
  HabitUpdateScreen: {
    id: string
    groupSelectScreen?: { id: string }
  }
  GroupCreateScreen: undefined
  GroupViewScreen: { id: string }
  GroupUpdateScreen: { id: string, userSelectEmail?: string }
  UserSelectScreen: { nextScreen: keyof RootStackParamList }
  GroupUsersScreen: { id: string }
  GroupUsersAppendScreen: { id: string }
  GroupSelectScreen: { nextScreenName: keyof RootStackParamList }
}

const RootStack = createNativeStackNavigator<RootStackParamList>()

const Tab = createBottomTabNavigator()

export const AppTabs = (): JSX.Element => {
  const { getTreatment } = useSplit()

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
      {getTreatment('Group') === 'on' && (
        <Tab.Screen
          name="GroupsScreen"
          component={GroupsScreen.Container}
          options={{
            ...GroupsScreen.options,
            tabBarTestID: 'GroupsTabButton',
            tabBarIcon: ({ color, size }) => (
              <TabBarIcon name="account-group" color={color} size={size} />
            )
          }}
        />
      )}
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
  const splitClient = splitFactory.client()

  if (typeof user === 'undefined') {
    return <SkeletonPlaceholderScreen testID="SkeletonPlaceholderScreen" />
  }

  return (
    <ApolloProvider url={Config.GRAPHQL_URL} authToken={idToken}>
      <SplitProvider client={splitClient}>
        <HeapNavigationContainer>
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
                <RootStack.Screen
                  name="GroupCreateScreen"
                  component={GroupCreateScreen.Container}
                  options={GroupCreateScreen.options}
                />
                <RootStack.Screen
                  name="GroupViewScreen"
                  component={GroupViewScreen.Container}
                  options={GroupViewScreen.options}
                />
                <RootStack.Screen
                  name="GroupUpdateScreen"
                  component={GroupUpdateScreen.Container}
                  options={GroupUpdateScreen.options}
                />
                <RootStack.Screen
                  name="GroupUsersScreen"
                  component={GroupUsersScreen.Container}
                  options={GroupUsersScreen.options}
                />
                <RootStack.Screen
                  name="GroupUsersAppendScreen"
                  component={GroupUsersAppendScreen.Container}
                  options={GroupUsersAppendScreen.options}
                />
                <RootStack.Screen
                  name="GroupSelectScreen"
                  component={GroupSelectScreen.Container}
                  options={GroupSelectScreen.options}
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
        </HeapNavigationContainer>
      </SplitProvider>
    </ApolloProvider>
  )
}

export const App = (): JSX.Element => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <ThemeProvider mode="light">
      <PaperProvider theme={DefaultTheme}>
        <AuthProvider client={auth0}>
          <ActionSheetProvider>
            <Suspense
              fallback={
                <SkeletonPlaceholderScreen testID="SkeletonPlaceholderScreen" />
              }>
              <Navigation />
            </Suspense>
          </ActionSheetProvider>
        </AuthProvider>
      </PaperProvider>
    </ThemeProvider>
    <Toast />
  </GestureHandlerRootView>
)
