import { MockedProvider } from '@apollo/client/testing'
import {
  useGroupsMockData,
  useGroupsMockQueryEmptyData,
  useGroupsMockQueryHasData
} from '@nx-react-native/habit/data-access'
import { render } from '@nx-react-native/shared/utils-testing'
import { useNavigation } from '@react-navigation/native'
import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react-native'
import React from 'react'
import reactI18next from 'react-i18next'
import { GroupsScreen } from './groups-screen'

describe('Given I am at Groups Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('When loaded, Then I should see Groups', async () => {
    const { getByTestId, getByText } = render(
      <MockedProvider mocks={useGroupsMockQueryHasData} addTypename={false}>
        <GroupsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('GroupsScreenSkeleton'))

    expect(getByText(useGroupsMockData[0].name)).toBeDefined()
  })

  it('When loading, Then I should see Skeleton Screen', () => {
    jest
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .spyOn<any, 'useTranslation'>(reactI18next, 'useTranslation')
      .mockImplementationOnce(() => {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw new Promise(() => null)
      })
    const { getByTestId } = render(<GroupsScreen.Container />)

    expect(getByTestId('GroupsScreenSkeleton')).toBeDefined()
  })

  it('When Error, Then I should see Groups Screen Error', async () => {
    jest.spyOn(console, 'error').mockImplementationOnce(() => null)
    const { getByTestId } = render(
      <MockedProvider addTypename={false}>
        <GroupsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('GroupsScreenSkeleton'))

    expect(getByTestId('GroupsScreenError')).toBeDefined()
  })

  it('When Empty Data, Then I should see Empty Groups Text', async () => {
    const { getByTestId, getByText } = render(
      <MockedProvider mocks={useGroupsMockQueryEmptyData} addTypename={false}>
        <GroupsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('GroupsScreenSkeleton'))

    expect(getByText('emptyData')).toBeDefined()
  })

  it('When I press Group Create Button, Then I see Group Create Screen', async () => {
    const mockNavigate = jest.spyOn(useNavigation(), 'navigate')
    const { getByTestId, getByA11yLabel } = render(
      <MockedProvider mocks={useGroupsMockQueryHasData} addTypename={false}>
        <GroupsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('GroupsScreenSkeleton'))

    fireEvent.press(getByA11yLabel('createButtonAccessibilityLabel'))

    await waitFor(() => expect(mockNavigate).toBeCalledTimes(1))

    expect(mockNavigate).toBeCalledWith('GroupCreateScreen')
  })

  it('When I press Group, Then I see Group View Screen', async () => {
    const mockNavigate = jest.spyOn(useNavigation(), 'navigate')
    const { getByTestId, getByText } = render(
      <MockedProvider mocks={useGroupsMockQueryHasData} addTypename={false}>
        <GroupsScreen.Container />
      </MockedProvider>
    )
    const groupMockData = useGroupsMockData[0]

    await waitForElementToBeRemoved(() => getByTestId('GroupsScreenSkeleton'))

    fireEvent.press(getByText(groupMockData.name))

    await waitFor(() => expect(mockNavigate).toBeCalledTimes(1))

    expect(mockNavigate).toBeCalledWith('GroupViewScreen', {
      id: groupMockData.id
    })
  })
})
