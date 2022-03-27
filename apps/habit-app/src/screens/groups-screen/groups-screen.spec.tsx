import { MockedProvider } from '@apollo/client/testing'
import { render } from '@nx-react-native/shared/utils-testing'
import React from 'react'
import reactI18next from 'react-i18next'
import { GroupsScreen } from './groups-screen'

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

describe('Given I am at Groups Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('When loaded, Then I should see Groups Screen', async () => {
    const { getByTestId } = render(
      <MockedProvider addTypename={false}>
        <GroupsScreen.Container />
      </MockedProvider>
    )

    expect(getByTestId('GroupsScreen')).toBeDefined()
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

  it('When error, Then I should see Error Screen', () => {
    jest.spyOn(console, 'error').mockImplementationOnce(() => null)
    jest
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .spyOn<any, 'useTranslation'>(reactI18next, 'useTranslation')
      .mockImplementationOnce(() => {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw new Error()
      })

    const { getByTestId } = render(<GroupsScreen.Container />)

    expect(getByTestId('GroupsScreenError')).toBeDefined()
  })
})
