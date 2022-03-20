import { MockedProvider } from '@apollo/client/testing'
import {
  useHabitUpdateMockData,
  useHabitUpdateMockQueryError,
  useHabitUpdateMockQuerySuccess
} from '@nx-react-native/habit/data-access'
import * as SharedAuth from '@nx-react-native/shared/auth'
import { render } from '@nx-react-native/shared/utils-testing'
import { fireEvent, waitFor } from '@testing-library/react-native'
import React from 'react'
import reactI18next from 'react-i18next'
import { Alert } from 'react-native'
import { HabitUpdateScreen } from './habit-update-screen'

const mockGoBack = jest.fn()
jest.mock('@react-navigation/native', () => {
  const module = jest.requireActual('@react-navigation/native')
  return {
    ...module,
    useNavigation: () => ({
      ...module.useNavigation(),
      canGoBack: jest.fn().mockReturnValue(true),
      goBack: mockGoBack
    })
  }
})

const defaultParams = {
  id: useHabitUpdateMockData.id,
  name: useHabitUpdateMockData.name
}

describe('Given I am at Habit Update Screen', () => {
  it('When loaded, Then I should see Input with default value, And I should see Button', async () => {
    const { getByA11yLabel, getByText } = render(
      <MockedProvider addTypename={false}>
        <HabitUpdateScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    expect(getByA11yLabel('nameInputAccessibilityLabel')).toBeDefined()

    expect(getByA11yLabel('nameInputAccessibilityLabel').props.value).toEqual(
      useHabitUpdateMockData.name
    )

    expect(getByText('buttonTitle')).toBeDefined()
  })

  it('When initial load, Then I should see Skeleton Screen', () => {
    jest
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .spyOn<any, 'useTranslation'>(reactI18next, 'useTranslation')
      .mockImplementationOnce(() => {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw new Promise(() => null)
      })
    const { getByTestId } = render(<HabitUpdateScreen.Container />)

    expect(getByTestId('HabitUpdateScreenSkeleton')).toBeDefined()
  })

  it('And API has error, When I press Update Button, Then I should see Error Message', async () => {
    jest.spyOn(Alert, 'alert')
    jest.spyOn(SharedAuth, 'useAuth').mockImplementationOnce(() => ({
      user: useHabitUpdateMockData.user
    }))

    const { getByText } = render(
      <MockedProvider mocks={useHabitUpdateMockQueryError} addTypename={false}>
        <HabitUpdateScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    fireEvent.press(getByText('buttonTitle'))

    await waitFor(() => expect(Alert.alert).toBeCalledTimes(1))
    expect(Alert.alert).toHaveBeenCalledWith('errorTitle', 'An error occurred')
  })

  it('When I press Update Button, Then I should see Habit Updated', async () => {
    const { getByText } = render(
      <MockedProvider
        mocks={useHabitUpdateMockQuerySuccess}
        addTypename={false}>
        <HabitUpdateScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    fireEvent.press(getByText('buttonTitle'))

    await waitFor(() => expect(mockGoBack).toBeCalledTimes(1))
  })
})
