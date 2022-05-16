import { MockedProvider } from '@apollo/client/testing'
import * as SharedAuth from '@nx-react-native/shared/auth'
import { render } from '@nx-react-native/shared/utils-testing'
import '@testing-library/jest-native/extend-expect'
import { fireEvent, waitFor } from '@testing-library/react-native'
import React from 'react'
import ReactI18next from 'react-i18next'
import OneSignal from 'react-native-onesignal'
import Toast from 'react-native-toast-message'
import { ProfileScreen } from './profile-screen'
import {
  useProfileScreenAddUserMockSuccess,
  useProfileScreenMockData,
  useProfileScreenMockQuery,
  useProfileScreenUpdateUserMockSuccess
} from './profile-screen.mocks'

const defaultDeviceState = {
  userId: useProfileScreenMockData.pushNotificationUserId,
  pushToken: '',
  emailUserId: '',
  emailAddress: '',
  smsUserId: '',
  smsNumber: '',
  isSubscribed: false,
  isPushDisabled: false,
  isEmailSubscribed: false,
  isSMSSubscribed: false
}

describe('Given I am at Profile Screen', () => {
  beforeEach(() => {
    jest
      .spyOn(OneSignal, 'getDeviceState')
      .mockResolvedValue(defaultDeviceState)
    jest.spyOn(SharedAuth, 'useAuth').mockReturnValue({
      user: { email: useProfileScreenMockData.email }
    })
  })
  afterEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  it('When loaded, Then I should see correct UI', async () => {
    const { getByA11yLabel } = render(
      <MockedProvider mocks={useProfileScreenMockQuery} addTypename={false}>
        <ProfileScreen.Container />
      </MockedProvider>
    )

    await waitFor(() =>
      expect(
        getByA11yLabel('pushNotificationAccessibilityLabel')
      ).toBeDisabled()
    )
    expect(getByA11yLabel('logoutAccessibilityLabel')).toBeDefined()
    expect(getByA11yLabel('pushNotificationAccessibilityLabel')).toBeDefined()
  })

  it('When I press Logout, Then I should be logout', async () => {
    const mockLogout = jest.fn()
    jest.spyOn(SharedAuth, 'useAuth').mockImplementation(() => ({
      logout: mockLogout,
      user: { email: useProfileScreenMockData.email }
    }))

    const { getByA11yLabel } = render(
      <MockedProvider mocks={useProfileScreenMockQuery} addTypename={false}>
        <ProfileScreen.Container />
      </MockedProvider>
    )

    fireEvent.press(getByA11yLabel('logoutAccessibilityLabel'))

    await waitFor(() => expect(mockLogout).toBeCalledTimes(1))
  })

  it('When initial load, Then I should see Skeleton Screen', () => {
    jest
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .spyOn<any, 'useTranslation'>(ReactI18next, 'useTranslation')
      .mockImplementationOnce(() => {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw new Promise(() => null)
      })
    const { getByTestId } = render(
      <MockedProvider mocks={useProfileScreenMockQuery} addTypename={false}>
        <ProfileScreen.Container />
      </MockedProvider>
    )

    expect(getByTestId('ProfileScreenSkeleton')).toBeDefined()
  })

  it('When Error, Then I should see Error Screen', () => {
    jest.spyOn(console, 'error').mockImplementation(() => null)
    jest
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .spyOn<any, 'useTranslation'>(ReactI18next, 'useTranslation')
      .mockImplementationOnce(() => {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw new Error()
      })
    const { getByTestId } = render(
      <MockedProvider mocks={useProfileScreenMockQuery} addTypename={false}>
        <ProfileScreen.Container />
      </MockedProvider>
    )

    expect(getByTestId('ProfileScreenError')).toBeDefined()
  })

  it('When my device state is null, Then I should see Push Notification Switch disabled', async () => {
    jest.spyOn(OneSignal, 'getDeviceState').mockResolvedValue(null)

    const { getByA11yLabel } = render(
      <MockedProvider mocks={useProfileScreenMockQuery} addTypename={false}>
        <ProfileScreen.Container />
      </MockedProvider>
    )

    expect(getByA11yLabel('logoutAccessibilityLabel')).toBeDefined()
    expect(getByA11yLabel('pushNotificationAccessibilityLabel')).toBeDefined()
    await waitFor(() =>
      expect(
        getByA11yLabel('pushNotificationAccessibilityLabel')
      ).toBeDisabled()
    )
  })

  it('When I disable Push, Then I should see Push disabled', async () => {
    const spyToastShow = jest.spyOn(Toast, 'show')
    const { getByA11yLabel } = render(
      <MockedProvider
        mocks={[
          ...useProfileScreenMockQuery,
          ...useProfileScreenUpdateUserMockSuccess
        ]}
        addTypename={false}>
        <ProfileScreen.Container />
      </MockedProvider>
    )
    await waitFor(() =>
      expect(
        getByA11yLabel('pushNotificationAccessibilityLabel')
      ).toBeDisabled()
    )

    fireEvent(
      getByA11yLabel('pushNotificationAccessibilityLabel'),
      'onValueChange',
      false
    )
    await waitFor(() => expect(spyToastShow).toBeCalledTimes(1))
    expect(spyToastShow).toBeCalledWith({
      text1: 'pushNotificationSuccess',
      type: 'success'
    })
  })

  it('When I enable Push, Then I should see Push enabled', async () => {
    jest.spyOn(OneSignal, 'getDeviceState').mockResolvedValue({
      ...defaultDeviceState,
      userId: useProfileScreenMockData.addPushNotificationUserId
    })
    const spyToastShow = jest.spyOn(Toast, 'show')
    const { getByA11yLabel } = render(
      <MockedProvider
        mocks={[
          ...useProfileScreenMockQuery,
          ...useProfileScreenAddUserMockSuccess
        ]}
        addTypename={false}>
        <ProfileScreen.Container />
      </MockedProvider>
    )
    await waitFor(() =>
      expect(
        getByA11yLabel('pushNotificationAccessibilityLabel')
      ).toBeDisabled()
    )

    fireEvent(
      getByA11yLabel('pushNotificationAccessibilityLabel'),
      'onValueChange',
      true
    )
    await waitFor(() => expect(spyToastShow).toBeCalledTimes(1))
    expect(spyToastShow).toBeCalledWith({
      text1: 'pushNotificationSuccess',
      type: 'success'
    })
  })
})
