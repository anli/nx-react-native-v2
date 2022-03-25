import { faker } from '@faker-js/faker'
import * as SharedAuth from '@nx-react-native/shared/auth'
import { render } from '@nx-react-native/shared/utils-testing'
import { fireEvent, waitFor } from '@testing-library/react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ErrorScreen } from './error-screen'

const error = {
  name: faker.lorem.word(),
  message: faker.lorem.words()
}

const errorMockTokenExpired = {
  name: faker.lorem.word(),
  message:
    'Error: unable to parse jwt token:token is expired by 8m10.863843902s'
}

describe('Given I am at Error Screen', () => {
  it('Then I should see Error Message', () => {
    const { getByText } = render(
      <ErrorScreen error={error} resetErrorBoundary={jest.fn()} />
    )

    expect(getByText(error.message)).toBeDefined()
  })

  it('When loading, Then I should see Error Screen Skeleton', () => {
    ;(useTranslation as jest.Mock).mockImplementationOnce(() => {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw Promise.resolve()
    })
    const { getByTestId } = render(
      <ErrorScreen error={error} resetErrorBoundary={jest.fn()} />
    )

    expect(getByTestId('ErrorScreenSkeleton')).toBeDefined()
  })

  it('When error is token expired, And I press button, Then I should trigger relogin', async () => {
    const mockReLogin = jest.fn().mockResolvedValue(undefined)
    jest.spyOn(SharedAuth, 'useAuth').mockReturnValueOnce({
      reLogin: mockReLogin
    })
    const mockResetErrorBoundary = jest.fn()
    const { getByText } = render(
      <ErrorScreen
        error={errorMockTokenExpired}
        resetErrorBoundary={mockResetErrorBoundary}
      />
    )

    fireEvent.press(getByText('buttonTitle'))

    expect(mockReLogin).toBeCalledTimes(1)
    await waitFor(() => expect(mockResetErrorBoundary).toBeCalledTimes(1))
  })

  it('When error is unknown, And I press button, Then I should trigger logout', async () => {
    const mockLogout = jest.fn().mockResolvedValue(undefined)
    jest.spyOn(SharedAuth, 'useAuth').mockReturnValueOnce({
      logout: mockLogout
    })
    const mockResetErrorBoundary = jest.fn()
    const { getByText } = render(
      <ErrorScreen error={error} resetErrorBoundary={mockResetErrorBoundary} />
    )

    fireEvent.press(getByText('buttonTitle'))

    expect(mockLogout).toBeCalledTimes(1)
    await waitFor(() => expect(mockResetErrorBoundary).toBeCalledTimes(1))
  })
})
