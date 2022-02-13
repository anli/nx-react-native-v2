import { ThemeProvider } from '@nx-react-native/shared/ui'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  render as TestingRender,
  RenderAPI
} from '@testing-library/react-native'
import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'

const Stack = createNativeStackNavigator()

export const render = (Component: JSX.Element): RenderAPI => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  const ScreenComponent = (): JSX.Element => <>{Component}</>

  return TestingRender(
    <ThemeProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Component" component={ScreenComponent} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ThemeProvider>
  )
}
