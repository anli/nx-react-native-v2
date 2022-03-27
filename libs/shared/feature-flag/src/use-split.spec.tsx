import { renderHook } from '@testing-library/react-hooks'
import { render } from '@testing-library/react-native'
import React, { FC } from 'react'
import { View } from 'react-native'
import { SplitProvider } from './split-provider'
import { useSplit } from './use-split'

const MockComponent: FC = () => {
  useSplit()
  return <View />
}

const client: {
  on: jest.Mock<unknown, unknown[]>
  Event: {
    SDK_READY: string
  }
  getTreatment: jest.Mock<unknown, unknown[]>
} = {
  on: jest.fn().mockImplementation((_, cb) => {
    cb()
  }),
  Event: { SDK_READY: 'SDK_READY' },
  getTreatment: jest.fn()
}

describe('SplitProvider', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('When component is not wrapped in SplitProvider, Then I should see error', () => {
    jest.spyOn(console, 'error').mockImplementation(() => jest.fn())
    expect(() => render(<MockComponent />)).toThrowError()
  })

  it('When I getTreatment, Then I should see getTreatment result', () => {
    const spy = jest.spyOn(client, 'getTreatment')
    const wrapper: FC = ({ children }) => (
      <SplitProvider client={client as unknown as SplitIO.IClient}>
        {children}
      </SplitProvider>
    )
    const { result } = renderHook(() => useSplit(), { wrapper })

    result.current.getTreatment('flagName')

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('flagName')
  })
})
