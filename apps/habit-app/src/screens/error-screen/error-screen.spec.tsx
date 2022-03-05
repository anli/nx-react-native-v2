import { faker } from '@faker-js/faker'
import { render } from '@nx-react-native/shared/utils-testing'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ErrorScreen } from './error-screen'

const error = {
  name: faker.lorem.word(),
  message: faker.lorem.words()
}

describe('Given I am at Error Screen', () => {
  it('Then I should see Error Message', () => {
    const { getByText } = render(
      <ErrorScreen error={error} resetErrorBoundary={jest.fn()} />
    )

    expect(getByText(error.message)).toBeDefined()
  })

  it('When loading, Then I should see Error Screen Skeleton', () => {
    (useTranslation as jest.Mock).mockImplementation(() => {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw Promise.resolve()
    })
    const { getByTestId } = render(
      <ErrorScreen error={error} resetErrorBoundary={jest.fn()} />
    )

    expect(getByTestId('ErrorScreenSkeleton')).toBeDefined()
  })
})
