import { MockedProvider } from '@apollo/client/testing'
import * as SharedAuth from '@nx-react-native/shared/auth'
import { render } from '@nx-react-native/shared/utils-testing'
import { useNavigation } from '@react-navigation/native'
import { fireEvent, waitFor } from '@testing-library/react-native'
import React from 'react'
import ReactI18next from 'react-i18next'
import { Alert } from 'react-native'
import { GroupCreateScreen } from './group-create-screen'
import {
  groupCreateScreenAddMutationMockError,
  groupCreateScreenAddMutationMockSuccess,
  groupCreateScreenMockData
} from './group-create-screen.mocks'

describe('Given I am at Group Create Screen', () => {
  beforeAll(() => {
    jest.spyOn(SharedAuth, 'useAuth').mockImplementation(() => ({
      user: groupCreateScreenMockData.adminUsers[0]
    }))
  })

  afterAll(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  it('When loaded, Then I should see Input, And I should see Button', async () => {
    const { getByA11yLabel, getByText } = render(
      <MockedProvider addTypename={false}>
        <GroupCreateScreen.Container />
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
    const { getByTestId } = render(<GroupCreateScreen.Container />)

    expect(getByTestId('GroupCreateScreenSkeleton')).toBeDefined()
  })

  it('When I enter invalid Name Input, Then I should see Validation Error', async () => {
    const { findByText, getByText } = render(
      <MockedProvider addTypename={false}>
        <GroupCreateScreen.Container />
      </MockedProvider>
    )

    fireEvent.press(getByText('buttonTitle'))

    expect(await findByText('nameInputValidationRequired')).toBeDefined()
  })

  it('And API has error, And I enter valid Name Input, When I press Save Button, Then I should see Error Message', async () => {
    jest.spyOn(Alert, 'alert')
    const { getByText, getByA11yLabel } = render(
      <MockedProvider
        mocks={groupCreateScreenAddMutationMockError}
        addTypename={false}>
        <GroupCreateScreen.Container />
      </MockedProvider>
    )

    fireEvent(
      getByA11yLabel('nameInputAccessibilityLabel'),
      'changeText',
      groupCreateScreenMockData.name
    )

    fireEvent.press(getByText('buttonTitle'))

    await waitFor(() => expect(Alert.alert).toBeCalledTimes(1))
    expect(Alert.alert).toHaveBeenCalledWith('errorTitle', 'An error occurred')
  })

  it('And I enter valid Name Input, When I press Save Button, Then I should see Group Created', async () => {
    const mockGoBack = jest.spyOn(useNavigation(), 'goBack')
    const { getByText, getByA11yLabel } = render(
      <MockedProvider
        mocks={groupCreateScreenAddMutationMockSuccess}
        addTypename={false}>
        <GroupCreateScreen.Container />
      </MockedProvider>
    )

    fireEvent(
      getByA11yLabel('nameInputAccessibilityLabel'),
      'changeText',
      groupCreateScreenMockData.name
    )

    fireEvent.press(getByText('buttonTitle'))

    await waitFor(() => expect(mockGoBack).toBeCalledTimes(1))
  })
})
