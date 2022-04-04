import { MockedProvider } from '@apollo/client/testing'
import { render } from '@nx-react-native/shared/utils-testing'
import {
  act,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react-native'
import React from 'react'
import { Alert } from 'react-native'
import Toast from 'react-native-toast-message'
import { GroupUsersScreen } from './group-users-screen'
import {
  groupUsersScreenData,
  groupUsersScreenSubscriptionMockError,
  groupUsersScreenSubscriptionMockSuccess,
  removeAdminUserMutationMockError,
  removeAdminUserMutationMockSuccess
} from './group-users-screen.mocks'

const defaultParams = {
  id: groupUsersScreenData.id
}

const mockNavigate = jest.fn()
jest.mock('@react-navigation/native', () => {
  const module = jest.requireActual('@react-navigation/native')
  return {
    ...module,
    useNavigation: () => ({
      ...module.useNavigation(),
      canGoBack: jest.fn().mockReturnValue(true),
      goBack: jest.fn().mockReturnValue(true),
      navigate: mockNavigate
    })
  }
})

describe('Given I am at Group Users Screen', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  it('When loaded, Then I should see Users', async () => {
    const { getByTestId, getByText } = render(
      <MockedProvider
        mocks={groupUsersScreenSubscriptionMockSuccess}
        addTypename={false}>
        <GroupUsersScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('GroupUsersScreenSkeleton')
    )

    expect(getByText(groupUsersScreenData.adminUsers[0].email)).toBeDefined()
    expect(getByText(groupUsersScreenData.adminUsers[1].email)).toBeDefined()
  })

  it('When loading, Then I should see Skeleton Screen', async () => {
    const { getByTestId } = render(
      <MockedProvider
        mocks={groupUsersScreenSubscriptionMockSuccess}
        addTypename={false}>
        <GroupUsersScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    expect(getByTestId('GroupUsersScreenSkeleton')).toBeDefined()

    await waitForElementToBeRemoved(() =>
      getByTestId('GroupUsersScreenSkeleton')
    )
  })

  it('When Error, Then I should see Error Screen', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => null)
    const { getByTestId } = render(
      <MockedProvider
        mocks={groupUsersScreenSubscriptionMockError}
        addTypename={false}>
        <GroupUsersScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('GroupUsersScreenSkeleton')
    )

    expect(getByTestId('GroupUsersScreenError')).toBeDefined()
  })

  it('When I press Remove User Button, Then I should see Confirmation, When I press Confirm Button, Then I should see Toast Success', async () => {
    const spyAlert = jest.spyOn(Alert, 'alert')
    const spyToastShow = jest.spyOn(Toast, 'show')

    const { getByTestId, getAllByA11yLabel } = render(
      <MockedProvider
        mocks={[
          ...groupUsersScreenSubscriptionMockSuccess,
          ...removeAdminUserMutationMockSuccess
        ]}
        addTypename={false}>
        <GroupUsersScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('GroupUsersScreenSkeleton')
    )

    fireEvent.press(getAllByA11yLabel('deleteButtonAccessibilityLabel')[0])

    await waitFor(() => expect(Alert.alert).toBeCalledTimes(1))
    expect(Alert.alert).toHaveBeenCalledWith(
      'removeAdminUserConfirmationTitle',
      undefined,
      expect.anything()
    )

    void act(() => {
      spyAlert.mock.calls[0][2]?.[1].onPress?.()
    })

    await waitFor(() => expect(spyToastShow).toBeCalledTimes(1))
    expect(spyToastShow).toBeCalledWith({
      text1: 'removeAdminUserSuccess',
      type: 'success'
    })
  })

  it('And Mutation return Error, When I Remove User, Then I should see Error Screen', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => null)
    const spyAlert = jest.spyOn(Alert, 'alert')

    const { getByTestId, getAllByA11yLabel } = render(
      <MockedProvider
        mocks={[
          ...groupUsersScreenSubscriptionMockSuccess,
          ...removeAdminUserMutationMockError
        ]}
        addTypename={false}>
        <GroupUsersScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('GroupUsersScreenSkeleton')
    )

    fireEvent.press(getAllByA11yLabel('deleteButtonAccessibilityLabel')[0])

    await waitFor(() => expect(Alert.alert).toBeCalledTimes(1))
    expect(Alert.alert).toHaveBeenCalledWith(
      'removeAdminUserConfirmationTitle',
      undefined,
      expect.anything()
    )

    void act(() => {
      spyAlert.mock.calls[0][2]?.[1].onPress?.()
    })

    await waitFor(() =>
      expect(getByTestId('GroupUsersScreenError')).toBeDefined()
    )
  })

  it('When I press Add User Button, Then I should see Add User Screen', async () => {
    const { getByTestId, getByA11yLabel } = render(
      <MockedProvider
        mocks={groupUsersScreenSubscriptionMockSuccess}
        addTypename={false}>
        <GroupUsersScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('GroupUsersScreenSkeleton')
    )

    fireEvent.press(getByA11yLabel('addUserButtonAccessibilityLabel'))

    await waitFor(() => expect(mockNavigate).toBeCalledTimes(1))
    expect(mockNavigate).toBeCalledWith('GroupUsersAppendScreen', {
      id: defaultParams.id
    })
  })
})
