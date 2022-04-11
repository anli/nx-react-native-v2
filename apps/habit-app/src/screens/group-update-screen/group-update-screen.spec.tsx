import { MockedProvider } from '@apollo/client/testing'
import { render } from '@nx-react-native/shared/utils-testing'
import { useNavigation } from '@react-navigation/native'
import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react-native'
import React from 'react'
import { Alert } from 'react-native'
import { GroupUpdateScreen } from './group-update-screen'
import {
  groupUpdateScreenMockData,
  groupUpdateScreenQueryMockError,
  groupUpdateScreenQueryMockSuccess,
  groupUpdateScreenUpdateMutationMockError,
  groupUpdateScreenUpdateMutationMockSuccess
} from './group-update-screen.mocks'

const defaultParams = {
  id: groupUpdateScreenMockData.id
}

describe('Given I am at Group Update Screen', () => {
  it('When loaded, Then I should see Input with default value, And I should see Button', async () => {
    const { getByA11yLabel, getByText, getByTestId } = render(
      <MockedProvider
        mocks={groupUpdateScreenQueryMockSuccess}
        addTypename={false}>
        <GroupUpdateScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('GroupUpdateScreenSkeleton')
    )

    expect(getByA11yLabel('nameInputAccessibilityLabel')).toBeDefined()

    expect(getByA11yLabel('nameInputAccessibilityLabel').props.value).toEqual(
      groupUpdateScreenMockData.name
    )

    expect(getByText('buttonTitle')).toBeDefined()
  })

  it('When error, Then I should see Error Screen', async () => {
    jest.spyOn(console, 'error').mockImplementationOnce(() => null)
    const { getByTestId } = render(
      <MockedProvider
        mocks={groupUpdateScreenQueryMockError}
        addTypename={false}>
        <GroupUpdateScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('GroupUpdateScreenSkeleton')
    )

    expect(getByTestId('GroupUpdateScreenError')).toBeDefined()
  })

  it('And update API has error, When I press Update Button, Then I should see Error Message', async () => {
    jest.spyOn(Alert, 'alert')

    const { getByText, getByTestId } = render(
      <MockedProvider
        mocks={[
          ...groupUpdateScreenQueryMockSuccess,
          ...groupUpdateScreenUpdateMutationMockError
        ]}
        addTypename={false}>
        <GroupUpdateScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('GroupUpdateScreenSkeleton')
    )

    fireEvent.press(getByText('buttonTitle'))

    await waitFor(() => expect(Alert.alert).toBeCalledTimes(1))
    expect(Alert.alert).toHaveBeenCalledWith('errorTitle', 'An error occurred')
  })

  it('When I press Update Button, Then I should see Group Updated', async () => {
    const mockGoBack = jest.spyOn(useNavigation(), 'goBack')
    const { getByText, getByTestId } = render(
      <MockedProvider
        mocks={[
          ...groupUpdateScreenQueryMockSuccess,
          ...groupUpdateScreenUpdateMutationMockSuccess
        ]}
        addTypename={false}>
        <GroupUpdateScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('GroupUpdateScreenSkeleton')
    )

    fireEvent.press(getByText('buttonTitle'))

    await waitFor(() => expect(mockGoBack).toBeCalledTimes(1))
  })
})
