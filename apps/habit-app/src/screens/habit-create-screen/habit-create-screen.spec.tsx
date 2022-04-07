import { MockedProvider } from '@apollo/client/testing'
import faker from '@faker-js/faker'
import * as SharedAuth from '@nx-react-native/shared/auth'
import { render } from '@nx-react-native/shared/utils-testing'
import { useNavigation } from '@react-navigation/native'
import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react-native'
import React from 'react'
import { Alert } from 'react-native'
import { HabitCreateScreen } from './habit-create-screen'
import {
  habitCreateMutationMockError,
  habitCreateMutationMockSuccess,
  habitCreateMutationWithGroupMockSuccess,
  habitCreateScreenData,
  habitCreateScreenQueryMockError,
  habitCreateScreenQueryMockSuccess
} from './habit-create-screen.mocks'

describe('Given I am at Habit Create Screen', () => {
  afterEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  it('When loaded, Then I should see Input, And I should see Button', async () => {
    const { getByA11yLabel, getByText, getByTestId } = render(
      <MockedProvider
        addTypename={false}
        mocks={habitCreateScreenQueryMockSuccess}>
        <HabitCreateScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('HabitCreateScreenSkeleton')
    )

    expect(getByA11yLabel('nameInputAccessibilityLabel')).toBeDefined()

    expect(getByText('buttonTitle')).toBeDefined()
  })

  it('When Error, Then I should see Error Screen', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => null)
    const { getByTestId } = render(
      <MockedProvider
        addTypename={false}
        mocks={habitCreateScreenQueryMockError}>
        <HabitCreateScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('HabitCreateScreenSkeleton')
    )

    expect(getByTestId('HabitCreateScreenError')).toBeDefined()
  })

  it('When I enter invalid Name Input, Then I should see Validation Error', async () => {
    const { findByText, getByText, getByTestId } = render(
      <MockedProvider
        addTypename={false}
        mocks={habitCreateScreenQueryMockSuccess}>
        <HabitCreateScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('HabitCreateScreenSkeleton')
    )

    fireEvent.press(getByText('buttonTitle'))

    expect(await findByText('nameInputValidationRequired')).toBeDefined()
  })

  it('And user is undefined, And I enter valid Name Input, When I press Save Button, Then I should see Error Message', async () => {
    jest.spyOn(Alert, 'alert')

    const { getByText, getByA11yLabel, getByTestId } = render(
      <MockedProvider
        addTypename={false}
        mocks={habitCreateScreenQueryMockSuccess}>
        <HabitCreateScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('HabitCreateScreenSkeleton')
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
    jest.spyOn(SharedAuth, 'useAuth').mockImplementation(() => ({
      user: habitCreateScreenData.user
    }))

    const { getByText, getByA11yLabel, getByTestId } = render(
      <MockedProvider
        mocks={[
          ...habitCreateScreenQueryMockSuccess,
          ...habitCreateMutationMockError
        ]}
        addTypename={false}>
        <HabitCreateScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('HabitCreateScreenSkeleton')
    )

    fireEvent(
      getByA11yLabel('nameInputAccessibilityLabel'),
      'changeText',
      habitCreateScreenData.name
    )

    fireEvent.press(getByText('buttonTitle'))

    await waitFor(() => expect(Alert.alert).toBeCalledTimes(1))
    expect(Alert.alert).toHaveBeenCalledWith('errorTitle', 'An error occurred')
  })

  it('And I enter valid Name Input, When I press Save Button, Then I should see Habit Created', async () => {
    const mockGoBack = jest.spyOn(useNavigation(), 'goBack')
    jest.spyOn(SharedAuth, 'useAuth').mockImplementation(() => ({
      user: habitCreateScreenData.user
    }))

    const { getByText, getByA11yLabel, getByTestId } = render(
      <MockedProvider
        mocks={[
          ...habitCreateScreenQueryMockSuccess,
          ...habitCreateMutationMockSuccess
        ]}
        addTypename={false}>
        <HabitCreateScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('HabitCreateScreenSkeleton')
    )

    fireEvent(
      getByA11yLabel('nameInputAccessibilityLabel'),
      'changeText',
      habitCreateScreenData.name
    )

    fireEvent.press(getByText('buttonTitle'))

    await waitFor(() => expect(mockGoBack).toBeCalledTimes(1))
  })

  it('When I press Group Select Button, Then I should see Group Select Screen', async () => {
    const mockNavigate = jest.spyOn(useNavigation(), 'navigate')
    const { getByA11yLabel, getByTestId } = render(
      <MockedProvider
        addTypename={false}
        mocks={habitCreateScreenQueryMockSuccess}>
        <HabitCreateScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('HabitCreateScreenSkeleton')
    )

    fireEvent.press(getByA11yLabel('groupSelectButtonAccessibilityLabel'))

    await waitFor(() => expect(mockNavigate).toBeCalledTimes(1))
    expect(mockNavigate).toBeCalledWith('GroupSelectScreen', {
      nextScreenName: 'HabitCreateScreen'
    })
  })

  it('When I press Group Remove Button, Then I should see Group Removed', async () => {
    const mockGoBack = jest.spyOn(useNavigation(), 'goBack')
    jest.spyOn(SharedAuth, 'useAuth').mockImplementation(() => ({
      user: habitCreateScreenData.user
    }))
    const { getByA11yLabel, getByText, getByTestId } = render(
      <MockedProvider
        addTypename={false}
        mocks={[
          ...habitCreateScreenQueryMockSuccess,
          ...habitCreateMutationMockSuccess
        ]}>
        <HabitCreateScreen.Container />
      </MockedProvider>,
      {
        params: {
          groupSelectScreen: { id: habitCreateScreenData.groups[0].id }
        }
      }
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('HabitCreateScreenSkeleton')
    )

    expect(getByText(habitCreateScreenData.groups[0].name)).toBeDefined()

    fireEvent(
      getByA11yLabel('nameInputAccessibilityLabel'),
      'changeText',
      habitCreateScreenData.name
    )

    fireEvent.press(getByA11yLabel('groupRemoveButtonAccessibilityLabel'))

    fireEvent.press(getByA11yLabel('buttonAccessibilityLabel'))

    await waitFor(() => expect(mockGoBack).toBeCalledTimes(1))
  })

  it('And I have Group Selected, When I press Save Button, Then I should see previous screen', async () => {
    const mockGoBack = jest.spyOn(useNavigation(), 'goBack')
    jest.spyOn(SharedAuth, 'useAuth').mockImplementation(() => ({
      user: habitCreateScreenData.user
    }))
    const { getByA11yLabel, getByText, getByTestId } = render(
      <MockedProvider
        addTypename={false}
        mocks={[
          ...habitCreateScreenQueryMockSuccess,
          ...habitCreateMutationWithGroupMockSuccess
        ]}>
        <HabitCreateScreen.Container />
      </MockedProvider>,
      {
        params: {
          groupSelectScreen: { id: habitCreateScreenData.groups[0].id }
        }
      }
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('HabitCreateScreenSkeleton')
    )

    expect(getByText(habitCreateScreenData.groups[0].name)).toBeDefined()

    fireEvent(
      getByA11yLabel('nameInputAccessibilityLabel'),
      'changeText',
      habitCreateScreenData.name
    )

    fireEvent.press(getByA11yLabel('buttonAccessibilityLabel'))

    await waitFor(() => expect(mockGoBack).toBeCalledTimes(1))
  })
})
