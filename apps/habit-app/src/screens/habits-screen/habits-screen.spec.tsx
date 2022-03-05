import { MockedProvider } from '@apollo/client/testing'
import ExpoActionSheet from '@expo/react-native-action-sheet'
import * as SharedAuth from '@nx-react-native/shared/auth'
import { render } from '@nx-react-native/shared/utils-testing'
import {
  act,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react-native'
import React from 'react'
import { Alert } from 'react-native'
import {
  useHabitDeleteMockData,
  useHabitDeleteMockQueryError,
  useHabitDeleteMockQuerySuccess,
  useHabitsMockData,
  useHabitsMockQueryEmptyData,
  useHabitsMockQueryError,
  useHabitsMockQueryHasData
} from '../../habit'
import { HabitsScreen } from './habits-screen'

const mockNavigate = jest.fn()
jest.mock('@react-navigation/native', () => {
  const module = jest.requireActual('@react-navigation/native')
  return {
    ...module,
    useNavigation: () => ({
      ...module.useNavigation(),
      navigate: mockNavigate
    })
  }
})

describe('Given I am at Habits Screen', () => {
  it('When loaded, Then I should see Habits', async () => {
    const { getByTestId, getByText } = render(
      <MockedProvider mocks={useHabitsMockQueryHasData} addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    expect(getByText(useHabitsMockData[0].name)).toBeDefined()
  })

  it('When Empty Data, Then I should see Habits', async () => {
    const { getByTestId, getByText } = render(
      <MockedProvider mocks={useHabitsMockQueryEmptyData} addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    expect(getByText('emptyData')).toBeDefined()
  })

  it('When loading, Then I should see Habits Screen Skeleton', async () => {
    const { getByTestId, getByText } = render(
      <MockedProvider mocks={useHabitsMockQueryHasData} addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    expect(getByTestId('HabitsScreenSkeleton')).toBeDefined()

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    expect(getByText(useHabitsMockData[0].name)).toBeDefined()
  })

  it('When Error, Then I should see Habits Screen Error', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => null)
    const { getByTestId } = render(
      <MockedProvider addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    expect(getByTestId('HabitsScreenError')).toBeDefined()

    spy.mockRestore()
  })

  it('When Error And I press Retry, Then I should logout', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => null)
    const mockLogout = jest.fn()
    jest.spyOn(SharedAuth, 'useAuth').mockReturnValue({
      logout: mockLogout
    })

    const { getByTestId, findByTestId } = render(
      <MockedProvider mocks={useHabitsMockQueryError} addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    fireEvent.press(getByTestId('ErrorScreen.Button'))

    expect(mockLogout).toBeCalledTimes(1)

    expect(await findByTestId('HabitsScreenError'))

    spy.mockRestore()
  })

  it('When I press Habit Create Button, Then I see Habit Create Screen', async () => {
    const { getByTestId, getByA11yLabel } = render(
      <MockedProvider mocks={useHabitsMockQueryHasData} addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    fireEvent.press(getByA11yLabel('createHabitButtonAccessibilityLabel'))

    await waitFor(() => expect(mockNavigate).toBeCalledTimes(1))

    expect(mockNavigate).toBeCalledWith('HabitCreateScreen')
  })

  it('When I press Habit Item, Then I see Habit Options', async () => {
    const mockShowActionSheetWithOptions = jest.fn()
    jest.spyOn(ExpoActionSheet, 'useActionSheet').mockReturnValue({
      showActionSheetWithOptions: mockShowActionSheetWithOptions
    })

    const { getByTestId, getByText } = render(
      <MockedProvider mocks={useHabitsMockQueryHasData} addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    fireEvent.press(getByText(useHabitsMockData[0].name))

    await waitFor(() =>
      expect(mockShowActionSheetWithOptions).toBeCalledTimes(1)
    )
    const actionSheetConfig = mockShowActionSheetWithOptions.mock.calls[0][0]
    const actionSheetCallback = mockShowActionSheetWithOptions.mock.calls[0][1]

    expect(actionSheetConfig.options).toEqual([
      'deleteButtonLabel',
      'cancelButtonLabel'
    ])

    void act(() => {
      actionSheetCallback(1)
    })
  })

  it('When I delete Habit Item, Then I see Habit Deleted', async () => {
    jest.spyOn(Alert, 'alert')
    const mockShowActionSheetWithOptions = jest.fn()
    jest.spyOn(ExpoActionSheet, 'useActionSheet').mockReturnValue({
      showActionSheetWithOptions: mockShowActionSheetWithOptions
    })

    const { getByTestId, getByText } = render(
      <MockedProvider
        mocks={[
          ...useHabitsMockQueryHasData,
          ...useHabitDeleteMockQuerySuccess
        ]}
        addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    fireEvent.press(getByText(useHabitDeleteMockData.name))

    await waitFor(() =>
      expect(mockShowActionSheetWithOptions).toBeCalledTimes(1)
    )
    const actionSheetCallback = mockShowActionSheetWithOptions.mock.calls[0][1]

    void act(() => {
      actionSheetCallback(0)
    })

    await waitFor(() => expect(Alert.alert).toBeCalledTimes(1))
    expect(Alert.alert).toHaveBeenCalledWith('deleteSuccess')
  })

  it('And API has Error, When I delete Habit Item, Then I see Error Message', async () => {
    jest.spyOn(Alert, 'alert')
    const mockShowActionSheetWithOptions = jest.fn()
    jest.spyOn(ExpoActionSheet, 'useActionSheet').mockReturnValue({
      showActionSheetWithOptions: mockShowActionSheetWithOptions
    })

    const { getByTestId, getByText } = render(
      <MockedProvider
        mocks={[...useHabitsMockQueryHasData, ...useHabitDeleteMockQueryError]}
        addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    fireEvent.press(getByText(useHabitDeleteMockData.name))

    await waitFor(() =>
      expect(mockShowActionSheetWithOptions).toBeCalledTimes(1)
    )
    const actionSheetCallback = mockShowActionSheetWithOptions.mock.calls[0][1]

    void act(() => {
      actionSheetCallback(0)
    })

    await waitFor(() => expect(Alert.alert).toBeCalledTimes(1))
    expect(Alert.alert).toHaveBeenCalledWith('errorTitle')
  })
})
