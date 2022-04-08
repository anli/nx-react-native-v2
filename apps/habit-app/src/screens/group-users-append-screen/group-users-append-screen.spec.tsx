import { MockedProvider } from '@apollo/client/testing'
import { render } from '@nx-react-native/shared/utils-testing'
import { useNavigation } from '@react-navigation/native'
import { fireEvent, waitFor } from '@testing-library/react-native'
import React from 'react'
import ReactI18next from 'react-i18next'
import { Alert } from 'react-native'
import { GroupUsersAppendScreen } from './group-users-append-screen'
import {
  groupUsersAppendScreenData,
  setAdminUserMutationMockError,
  setAdminUserMutationMockSuccess,
  setAdminUserMutationMockSuccessNull
} from './group-users-append-screen.mocks'

const defaultParams = {
  id: groupUsersAppendScreenData.id
}

describe('Given I am at Group Users Append Screen', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('When loaded, Then I should see Input, And I should see Button', async () => {
    const { getByA11yLabel, getByText } = render(
      <MockedProvider addTypename={false}>
        <GroupUsersAppendScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    expect(getByA11yLabel('emailInputAccessibilityLabel')).toBeDefined()

    expect(getByText('buttonTitle')).toBeDefined()
  })

  it('When loading, Then I should see Skeleton Screen', () => {
    jest
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .spyOn<any, 'useTranslation'>(ReactI18next, 'useTranslation')
      .mockImplementationOnce(() => {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw new Promise(() => null)
      })
    const { getByTestId } = render(
      <MockedProvider addTypename={false}>
        <GroupUsersAppendScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    expect(getByTestId('GroupUsersAppendScreenSkeleton')).toBeDefined()
  })

  it('And I enter valid Input, When I press Add Button, Then I should go back to Previous Screen', async () => {
    const mockGoBack = jest.spyOn(useNavigation(), 'goBack')
    const { getByText, getByA11yLabel } = render(
      <MockedProvider
        mocks={setAdminUserMutationMockSuccess}
        addTypename={false}>
        <GroupUsersAppendScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    fireEvent(
      getByA11yLabel('emailInputAccessibilityLabel'),
      'changeText',
      groupUsersAppendScreenData.email
    )

    fireEvent.press(getByText('buttonTitle'))

    await waitFor(() => expect(mockGoBack).toBeCalledTimes(1))
  })

  it('And API has error, And I enter valid Input, When I press Add Button, Then I should see Error Message', async () => {
    jest.spyOn(Alert, 'alert')

    const { getByText, getByA11yLabel } = render(
      <MockedProvider mocks={setAdminUserMutationMockError} addTypename={false}>
        <GroupUsersAppendScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    fireEvent(
      getByA11yLabel('emailInputAccessibilityLabel'),
      'changeText',
      groupUsersAppendScreenData.email
    )

    fireEvent.press(getByText('buttonTitle'))

    await waitFor(() => expect(Alert.alert).toBeCalledTimes(1))
    expect(Alert.alert).toHaveBeenCalledWith('errorTitle', 'An error occurred')
  })

  it('And API return null, And I enter valid Input, When I press Add Button, Then I should see Error Message User Does Not Exist', async () => {
    jest.spyOn(Alert, 'alert')

    const { getByText, getByA11yLabel } = render(
      <MockedProvider
        mocks={setAdminUserMutationMockSuccessNull}
        addTypename={false}>
        <GroupUsersAppendScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    fireEvent(
      getByA11yLabel('emailInputAccessibilityLabel'),
      'changeText',
      groupUsersAppendScreenData.email
    )

    fireEvent.press(getByText('buttonTitle'))

    await waitFor(() => expect(Alert.alert).toBeCalledTimes(1))
    expect(Alert.alert).toHaveBeenCalledWith(
      'errorTitle',
      'errorUserDoesNotExist'
    )
  })
})
