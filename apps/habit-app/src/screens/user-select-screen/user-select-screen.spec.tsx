import { MockedProvider } from '@apollo/client/testing'
import faker from '@faker-js/faker'
import { render } from '@nx-react-native/shared/utils-testing'
import { fireEvent, waitFor } from '@testing-library/react-native'
import React from 'react'
import reactI18next from 'react-i18next'
import { UserSelectScreen } from './user-select-screen'

const mockNavigate = jest.fn()
jest.mock('@react-navigation/native', () => {
  const module = jest.requireActual('@react-navigation/native')
  return {
    ...module,
    useNavigation: () => ({
      ...module.useNavigation(),
      canGoBack: jest.fn().mockReturnValue(true),
      navigate: mockNavigate
    })
  }
})

const defaultParams = {
  nextScreen: 'NextScreen'
}

describe('Given I am at User Select Screen', () => {
  it('When loaded, Then I should see Input, And I should see Button', async () => {
    const { getByA11yLabel, getByText } = render(
      <MockedProvider addTypename={false}>
        <UserSelectScreen.Container />
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
      .spyOn<any, 'useTranslation'>(reactI18next, 'useTranslation')
      .mockImplementationOnce(() => {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw new Promise(() => null)
      })
    const { getByTestId } = render(<UserSelectScreen.Container />)

    expect(getByTestId('UserSelectScreenSkeleton')).toBeDefined()
  })

  it('When I enter valid email, And I press Button, Then I should see Next Screen', async () => {
    const userSelectEmail = faker.internet.email()
    const { getByText, getByA11yLabel } = render(
      <MockedProvider>
        <UserSelectScreen.Container />
      </MockedProvider>,
      {
        params: defaultParams
      }
    )

    fireEvent(
      getByA11yLabel('emailInputAccessibilityLabel'),
      'changeText',
      userSelectEmail
    )
    fireEvent.press(getByText('buttonTitle'))

    await waitFor(() => expect(mockNavigate).toBeCalledTimes(1))
    expect(mockNavigate).toBeCalledWith({
      merge: true,
      name: defaultParams.nextScreen,
      params: { userSelectEmail }
    })
  })
})
