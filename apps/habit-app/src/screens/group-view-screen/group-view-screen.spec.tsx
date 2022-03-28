import { MockedProvider } from '@apollo/client/testing'
import {
  useGroupMockData,
  useGroupMockQueryError,
  useGroupMockQuerySuccess
} from '@nx-react-native/habit/data-access'
import { render } from '@nx-react-native/shared/utils-testing'
import { waitForElementToBeRemoved } from '@testing-library/react-native'
import React from 'react'
import { GroupViewScreen } from './group-view-screen'

const mockGoBack = jest.fn()
const mockSetOptions = jest.fn()
jest.mock('@react-navigation/native', () => {
  const module = jest.requireActual('@react-navigation/native')
  return {
    ...module,
    useNavigation: () => ({
      ...module.useNavigation(),
      canGoBack: jest.fn().mockReturnValue(true),
      goBack: mockGoBack,
      setOptions: mockSetOptions
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

    expect(mockSetOptions).toHaveBeenLastCalledWith({
      headerShown: true,
      title: useGroupMockData.name
    })
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
})
