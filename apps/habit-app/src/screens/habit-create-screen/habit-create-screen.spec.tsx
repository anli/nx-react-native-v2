import { MockedProvider } from '@apollo/client/testing'
import faker from '@faker-js/faker'
import * as SharedAuth from '@nx-react-native/shared/auth'
import { render } from '@nx-react-native/shared/utils-testing'
import { fireEvent, waitFor } from '@testing-library/react-native'
import React from 'react'
import ReactI18next from 'react-i18next'
import { Alert } from 'react-native'
import {
  useHabitCreateMockData,
  useHabitCreateMockQueryError,
  useHabitCreateMockQuerySuccess
} from '../../habit'
import { HabitCreateScreen } from './habit-create-screen'

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

describe('Given I am at Habit Create Screen', () => {
  it('When loaded, Then I should see Input, And I should see Button', async () => {
    const { getByA11yLabel, getByText } = render(
      <MockedProvider addTypename={false}>
        <HabitCreateScreen.Container />
      </MockedProvider>
    )

    expect(getByA11yLabel('nameInputAccessibilityLabel')).toBeDefined()

    expect(getByText('buttonTitle')).toBeDefined()
  })

  it('When initial load, Then I should see Skeleton Screen', () => {
    jest
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .spyOn<any, 'useTranslation'>(ReactI18next, 'useTranslation')
      .mockImplementationOnce(() => {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw new Promise(() => null)
      })
    const { getByTestId } = render(<HabitCreateScreen.Container />)

    expect(getByTestId('HabitCreateScreenSkeleton')).toBeDefined()
  })

  it('When I enter invalid Name Input, Then I should see Validation Error', async () => {
    const { findByText, getByText } = render(
      <MockedProvider addTypename={false}>
        <HabitCreateScreen.Container />
      </MockedProvider>
    )

    fireEvent.press(getByText('buttonTitle'))

    expect(await findByText('nameInputValidationRequired')).toBeDefined()
  })

  it('And user is undefined, And I enter valid Name Input, When I press Save Button, Then I should see Error Message', async () => {
    jest.spyOn(Alert, 'alert')

    const { getByText, getByA11yLabel } = render(
      <MockedProvider addTypename={false}>
        <HabitCreateScreen.Container />
      </MockedProvider>
    )

    fireEvent(
      getByA11yLabel('nameInputAccessibilityLabel'),
      'changeText',
      faker.lorem.word()
    )

    fireEvent.press(getByText('buttonTitle'))

    await waitFor(() => expect(Alert.alert).toBeCalledTimes(1))
    expect(Alert.alert).toHaveBeenCalledWith('errorTitle', 'user is null')
  })

  it('And API has error, And I enter valid Name Input, When I press Save Button, Then I should see Error Message', async () => {
    jest.spyOn(Alert, 'alert')
    jest.spyOn(SharedAuth, 'useAuth').mockImplementationOnce(() => ({
      user: useHabitCreateMockData.user
    }))

    const { getByText, getByA11yLabel } = render(
      <MockedProvider mocks={useHabitCreateMockQueryError} addTypename={false}>
        <HabitCreateScreen.Container />
      </MockedProvider>
    )

    fireEvent(
      getByA11yLabel('nameInputAccessibilityLabel'),
      'changeText',
      useHabitCreateMockData.name
    )

    fireEvent.press(getByText('buttonTitle'))

    await waitFor(() => expect(Alert.alert).toBeCalledTimes(1))
    expect(Alert.alert).toHaveBeenCalledWith('errorTitle', 'An error occurred')
  })

  it('And I enter valid Name Input, When I press Save Button, Then I should see Habit Created', async () => {
    jest.spyOn(SharedAuth, 'useAuth').mockImplementationOnce(() => ({
      user: useHabitCreateMockData.user
    }))

    const { getByText, getByA11yLabel } = render(
      <MockedProvider
        mocks={useHabitCreateMockQuerySuccess}
        addTypename={false}>
        <HabitCreateScreen.Container />
      </MockedProvider>
    )

    fireEvent(
      getByA11yLabel('nameInputAccessibilityLabel'),
      'changeText',
      useHabitCreateMockData.name
    )

    fireEvent.press(getByText('buttonTitle'))

    await waitFor(() => expect(mockGoBack).toBeCalledTimes(1))
  })
})
