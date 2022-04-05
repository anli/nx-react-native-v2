import { MockedProvider } from '@apollo/client/testing'
import { render } from '@nx-react-native/shared/utils-testing'
import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react-native'
import React from 'react'
import { Alert } from 'react-native'
import { HabitUpdateScreen } from './habit-update-screen'
import {
  habitUpdateMutationMockError,
  habitUpdateMutationMockSuccess,
  habitUpdateMutationWithGroupRemovedMockSuccess,
  habitUpdateScreenData,
  habitUpdateScreenQueryMockError,
  habitUpdateScreenQueryMockSuccess
} from './habit-update-screen.mocks'

const mockGoBack = jest.fn()
const mockNavigate = jest.fn()
jest.mock('@react-navigation/native', () => {
  const module = jest.requireActual('@react-navigation/native')
  return {
    ...module,
    useNavigation: () => ({
      ...module.useNavigation(),
      canGoBack: jest.fn().mockReturnValue(true),
      goBack: mockGoBack,
      navigate: mockNavigate
    })
  }
})

const defaultParams = {
  id: habitUpdateScreenData.id
}

describe('Given I am at Habit Update Screen', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('When loaded, Then I should see Input with default value, And I should see Button', async () => {
    const { getByA11yLabel, getByText, getByTestId } = render(
      <MockedProvider
        addTypename={false}
        mocks={habitUpdateScreenQueryMockSuccess}>
        <HabitUpdateScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('HabitUpdateScreenSkeleton')
    )

    expect(getByA11yLabel('nameInputAccessibilityLabel')).toBeDefined()

    expect(getByA11yLabel('nameInputAccessibilityLabel').props.value).toEqual(
      habitUpdateScreenData.name
    )

    expect(getByText('buttonTitle')).toBeDefined()
  })

  it('When Error, Then I should see Error Screen', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => null)
    const { getByTestId } = render(
      <MockedProvider
        addTypename={false}
        mocks={habitUpdateScreenQueryMockError}>
        <HabitUpdateScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('HabitUpdateScreenSkeleton')
    )

    expect(getByTestId('HabitUpdateScreenError')).toBeDefined()
  })

  it('When I press Update Button, Then I should see Habit Updated', async () => {
    const { getByText, getByTestId } = render(
      <MockedProvider
        mocks={[
          ...habitUpdateScreenQueryMockSuccess,
          ...habitUpdateMutationMockSuccess
        ]}
        addTypename={false}>
        <HabitUpdateScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('HabitUpdateScreenSkeleton')
    )

    fireEvent.press(getByText('buttonTitle'))

    await waitFor(() => expect(mockGoBack).toBeCalledTimes(1))
  })

  it('And API has error, When I press Update Button, Then I should see Error Message', async () => {
    jest.spyOn(Alert, 'alert')

    const { getByText, getByTestId } = render(
      <MockedProvider
        mocks={[
          ...habitUpdateScreenQueryMockSuccess,
          ...habitUpdateMutationMockError
        ]}
        addTypename={false}>
        <HabitUpdateScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('HabitUpdateScreenSkeleton')
    )

    fireEvent.press(getByText('buttonTitle'))

    await waitFor(() => expect(Alert.alert).toBeCalledTimes(1))
    expect(Alert.alert).toHaveBeenCalledWith('errorTitle', 'An error occurred')
  })

  it('When I press Group Select Button, Then I should see Group Select Screen', async () => {
    const { getByA11yLabel, getByTestId } = render(
      <MockedProvider
        addTypename={false}
        mocks={habitUpdateScreenQueryMockSuccess}>
        <HabitUpdateScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('HabitUpdateScreenSkeleton')
    )

    fireEvent.press(getByA11yLabel('groupSelectButtonAccessibilityLabel'))

    await waitFor(() => expect(mockNavigate).toBeCalledTimes(1))
    expect(mockNavigate).toBeCalledWith('GroupSelectScreen', {
      nextScreenName: 'HabitUpdateScreen'
    })
  })

  it('When I press Group Remove Button, And I press Save Button, Then I should see Group Removed', async () => {
    const { getByA11yLabel, getByTestId, queryByText, getByText } = render(
      <MockedProvider
        addTypename={false}
        mocks={[
          ...habitUpdateScreenQueryMockSuccess,
          ...habitUpdateMutationWithGroupRemovedMockSuccess
        ]}>
        <HabitUpdateScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('HabitUpdateScreenSkeleton')
    )

    expect(getByText(habitUpdateScreenData.groups[0].name)).toBeDefined()

    fireEvent.press(getByA11yLabel('groupRemoveButtonAccessibilityLabel'))

    await waitFor(() =>
      expect(queryByText(habitUpdateScreenData.groups[0].name)).toBeNull()
    )

    fireEvent.press(getByA11yLabel('buttonAccessibilityLabel'))

    await waitFor(() => expect(mockGoBack).toBeCalledTimes(1))
  })
})
