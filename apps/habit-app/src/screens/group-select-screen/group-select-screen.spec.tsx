import { MockedProvider } from '@apollo/client/testing'
import faker from '@faker-js/faker'
import { render } from '@nx-react-native/shared/utils-testing'
import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react-native'
import React from 'react'
import { GroupSelectScreen } from './group-select-screen'
import {
  groupSelectScreenData,
  groupSelectScreenQueryMockError,
  groupSelectScreenQueryMockSuccess
} from './group-select-screen.mocks'

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

const defaultParams = {
  nextScreenName: faker.lorem.word()
}

describe('Given I am at Group Select Screen', () => {
  afterEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  it('When loaded, Then I should see Groups', async () => {
    const { getByText, getByTestId } = render(
      <MockedProvider
        mocks={groupSelectScreenQueryMockSuccess}
        addTypename={false}>
        <GroupSelectScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('GroupSelectScreenSkeleton')
    )

    expect(getByText(groupSelectScreenData.groups[0].name)).toBeDefined()
  })

  it('When Error, Then I should see Error Screen', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => null)
    const { getByTestId } = render(
      <MockedProvider
        addTypename={false}
        mocks={groupSelectScreenQueryMockError}>
        <GroupSelectScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('GroupSelectScreenSkeleton')
    )

    expect(getByTestId('GroupSelectScreenError')).toBeDefined()
  })

  it('When I press Group, Then I should see Next Screen with Selected Group', async () => {
    const { getByText, getByTestId } = render(
      <MockedProvider
        mocks={groupSelectScreenQueryMockSuccess}
        addTypename={false}>
        <GroupSelectScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    await waitForElementToBeRemoved(() =>
      getByTestId('GroupSelectScreenSkeleton')
    )

    fireEvent.press(getByText(groupSelectScreenData.groups[0].name))

    await waitFor(() => expect(mockNavigate).toBeCalledTimes(1))
    expect(mockNavigate).toBeCalledWith({
      merge: true,
      name: defaultParams.nextScreenName,
      params: {
        groupSelectScreen: { id: groupSelectScreenData.groups[0].id }
      }
    })
  })
})
