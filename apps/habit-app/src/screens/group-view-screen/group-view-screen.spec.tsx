import { MockedProvider } from '@apollo/client/testing'
import {
  useGroupDeleteMockQuerySuccess,
  useGroupMockData,
  useGroupMockQueryError,
  useGroupMockQuerySuccess
} from '@nx-react-native/habit/data-access'
import { render } from '@nx-react-native/shared/utils-testing'
import {
  act,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react-native'
import React from 'react'
import { Alert } from 'react-native'
import { GroupViewScreen } from './group-view-screen'

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
  id: useGroupMockData.id
}

describe('Given I am at Group View Screen', () => {
  it('When loaded, Then I should group name', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={useGroupMockQuerySuccess} addTypename={false}>
        <GroupViewScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('GroupViewScreenSkeleton')
    )
  })

  it('When loading, Then I should see Habits Screen Skeleton', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={useGroupMockQuerySuccess} addTypename={false}>
        <GroupViewScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    expect(getByTestId('GroupViewScreenSkeleton')).toBeDefined()

    await waitForElementToBeRemoved(() =>
      getByTestId('GroupViewScreenSkeleton')
    )
  })

  it('When Error, Then I should see Habits Screen Error', async () => {
    jest.spyOn(console, 'error').mockImplementationOnce(() => null)
    const { getByTestId } = render(
      <MockedProvider mocks={useGroupMockQueryError} addTypename={false}>
        <GroupViewScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('GroupViewScreenSkeleton')
    )

    expect(getByTestId('GroupViewScreenError')).toBeDefined()
  })

  it('When I press Delete Group Button, Then I should see Delete Confirmation, When I press Confirm Button, Then I should see Group Deleted, And I should see Previous Screen', async () => {
    const spyAlert = jest.spyOn(Alert, 'alert')

    const { getByTestId, getByA11yLabel } = render(
      <MockedProvider
        mocks={[...useGroupMockQuerySuccess, ...useGroupDeleteMockQuerySuccess]}
        addTypename={false}>
        <GroupViewScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('GroupViewScreenSkeleton')
    )

    fireEvent.press(getByA11yLabel('deleteButtonAccessibilityLabel'))

    await waitFor(() => expect(Alert.alert).toBeCalledTimes(1))
    expect(Alert.alert).toHaveBeenCalledWith(
      'deleteConfirmationTitle',
      'deleteConfirmationMessage',
      expect.anything()
    )

    void act(() => {
      spyAlert.mock.calls[0][2]?.[1].onPress?.()
    })

    await waitFor(() => expect(mockGoBack).toBeCalledTimes(1))
  })

  it('When I press Update Group Button, Then I should see Group Update Screen', async () => {
    const { getByTestId, getByA11yLabel } = render(
      <MockedProvider mocks={useGroupMockQuerySuccess} addTypename={false}>
        <GroupViewScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('GroupViewScreenSkeleton')
    )

    fireEvent.press(getByA11yLabel('updateButtonAccessibilityLabel'))

    await waitFor(() => expect(mockNavigate).toBeCalledTimes(1))
    expect(mockNavigate).toBeCalledWith('GroupUpdateScreen', {
      id: useGroupMockData.id
    })
  })
})
