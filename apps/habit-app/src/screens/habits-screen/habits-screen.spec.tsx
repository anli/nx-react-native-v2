import { MockedProvider } from '@apollo/client/testing'
import ExpoActionSheet from '@expo/react-native-action-sheet'
import {
  useHabitActivityCreateMockQuerySuccess,
  useHabitActivityDeleteMockQueryError,
  useHabitActivityDeleteMockQuerySuccess,
  useHabitDeleteMockData,
  useHabitDeleteMockQueryError,
  useHabitDeleteMockQuerySuccess,
  useHabitsMockData,
  useHabitsMockQueryEmptyData,
  useHabitsMockQueryError,
  useHabitsMockQueryHasData,
  useHabitsMockQueryHasNextWeekData,
  useHabitsMockQueryHasPreviousWeekData
} from '@nx-react-native/habit/data-access'
import * as SharedAuth from '@nx-react-native/shared/auth'
import { formatDateRange } from '@nx-react-native/shared/utils-date'
import { render } from '@nx-react-native/shared/utils-testing'
import {
  act,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react-native'
import {
  addWeeks,
  endOfWeek,
  startOfToday,
  startOfWeek,
  subWeeks
} from 'date-fns'
import React from 'react'
import { Alert } from 'react-native'
import Toast from 'react-native-toast-message'
import { HabitsScreen } from './habits-screen'

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

describe('Given I am at Habits Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('When loaded, Then I should see Habits', async () => {
    const { getByTestId, getByText, getAllByTestId } = render(
      <MockedProvider mocks={useHabitsMockQueryHasData} addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    expect(getByText(useHabitsMockData[0].name)).toBeDefined()

    expect(getAllByTestId('HabitWeekDay.Checkbox')).toHaveLength(
      useHabitsMockData.length * 7
    )
  })

  it('When Empty Data, Then I should see Habits', async () => {
    const { getByTestId, getByText } = render(
      <MockedProvider mocks={useHabitsMockQueryEmptyData} addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    expect(getByText('emptyData')).toBeDefined()
  })

  it('When loading, Then I should see Habits Screen Skeleton', async () => {
    const { getByTestId, getByText } = render(
      <MockedProvider mocks={useHabitsMockQueryHasData} addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    expect(getByTestId('HabitsScreenSkeleton')).toBeDefined()

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    expect(getByText(useHabitsMockData[0].name)).toBeDefined()
  })

  it('When Error, Then I should see Habits Screen Error', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => null)
    const { getByTestId } = render(
      <MockedProvider addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    expect(getByTestId('HabitsScreenError')).toBeDefined()

    spy.mockRestore()
  })

  it('When Error And I press Retry, Then I should logout', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => null)
    const mockLogout = jest.fn()
    jest.spyOn(SharedAuth, 'useAuth').mockReturnValue({
      logout: mockLogout
    })

    const { getByTestId, findByTestId } = render(
      <MockedProvider mocks={useHabitsMockQueryError} addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    fireEvent.press(getByTestId('ErrorScreen.Button'))

    expect(mockLogout).toBeCalledTimes(1)

    expect(await findByTestId('HabitsScreenError'))

    spy.mockRestore()
  })

  it('When I press Habit Create Button, Then I see Habit Create Screen', async () => {
    const { getByTestId, getByA11yLabel } = render(
      <MockedProvider mocks={useHabitsMockQueryHasData} addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    fireEvent.press(getByA11yLabel('createHabitButtonAccessibilityLabel'))

    await waitFor(() => expect(mockNavigate).toBeCalledTimes(1))

    expect(mockNavigate).toBeCalledWith('HabitCreateScreen')
  })

  it('When I press Habit Item, Then I see Habit Options', async () => {
    const mockShowActionSheetWithOptions = jest.fn()
    jest.spyOn(ExpoActionSheet, 'useActionSheet').mockReturnValue({
      showActionSheetWithOptions: mockShowActionSheetWithOptions
    })

    const { getByTestId, getByText } = render(
      <MockedProvider mocks={useHabitsMockQueryHasData} addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    fireEvent.press(getByText(useHabitsMockData[0].name))

    await waitFor(() =>
      expect(mockShowActionSheetWithOptions).toBeCalledTimes(1)
    )
    const actionSheetConfig = mockShowActionSheetWithOptions.mock.calls[0][0]
    const actionSheetCallback = mockShowActionSheetWithOptions.mock.calls[0][1]

    expect(actionSheetConfig.options).toEqual([
      'updateButtonLabel',
      'deleteButtonLabel',
      'cancelButtonLabel'
    ])

    void act(() => {
      actionSheetCallback(2)
    })
  })

  it('When I delete Habit Item, Then I see Habit Deleted', async () => {
    jest.spyOn(Alert, 'alert')
    const mockShowActionSheetWithOptions = jest.fn()
    jest.spyOn(ExpoActionSheet, 'useActionSheet').mockReturnValue({
      showActionSheetWithOptions: mockShowActionSheetWithOptions
    })

    const { getByTestId, getByText } = render(
      <MockedProvider
        mocks={[
          ...useHabitsMockQueryHasData,
          ...useHabitDeleteMockQuerySuccess
        ]}
        addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    fireEvent.press(getByText(useHabitDeleteMockData.name))

    await waitFor(() =>
      expect(mockShowActionSheetWithOptions).toBeCalledTimes(1)
    )
    const actionSheetCallback = mockShowActionSheetWithOptions.mock.calls[0][1]

    void act(() => {
      actionSheetCallback(1)
    })

    await waitFor(() => expect(Alert.alert).toBeCalledTimes(1))
    expect(Alert.alert).toHaveBeenCalledWith('deleteSuccess')
  })

  it('And API has Error, When I delete Habit Item, Then I see Error Message', async () => {
    jest.spyOn(Alert, 'alert')
    const mockShowActionSheetWithOptions = jest.fn()
    jest.spyOn(ExpoActionSheet, 'useActionSheet').mockReturnValue({
      showActionSheetWithOptions: mockShowActionSheetWithOptions
    })

    const { getByTestId, getByText } = render(
      <MockedProvider
        mocks={[...useHabitsMockQueryHasData, ...useHabitDeleteMockQueryError]}
        addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    fireEvent.press(getByText(useHabitDeleteMockData.name))

    await waitFor(() =>
      expect(mockShowActionSheetWithOptions).toBeCalledTimes(1)
    )
    const actionSheetCallback = mockShowActionSheetWithOptions.mock.calls[0][1]

    void act(() => {
      actionSheetCallback(1)
    })

    await waitFor(() => expect(Alert.alert).toBeCalledTimes(1))
    expect(Alert.alert).toHaveBeenCalledWith('errorTitle')
  })

  it('When I update Habit Item, Then I see Habit Update Screen', async () => {
    const mockShowActionSheetWithOptions = jest.fn()
    jest.spyOn(ExpoActionSheet, 'useActionSheet').mockReturnValue({
      showActionSheetWithOptions: mockShowActionSheetWithOptions
    })

    const { getByTestId, getByText } = render(
      <MockedProvider
        mocks={[
          ...useHabitsMockQueryHasData,
          ...useHabitDeleteMockQuerySuccess
        ]}
        addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    fireEvent.press(getByText(useHabitsMockData[0].name))

    await waitFor(() =>
      expect(mockShowActionSheetWithOptions).toBeCalledTimes(1)
    )
    const actionSheetCallback = mockShowActionSheetWithOptions.mock.calls[0][1]

    void act(() => {
      actionSheetCallback(0)
    })

    await waitFor(() => expect(mockNavigate).toBeCalledTimes(1))
    expect(mockNavigate).toHaveBeenCalledWith('HabitUpdateScreen', {
      id: useHabitsMockData[0].id,
      name: useHabitsMockData[0].name
    })
  })

  it('When I press checked Habit Week Day, Then I should see Habit Week Day unchecked', async () => {
    const spyToastShow = jest.spyOn(Toast, 'show')

    const { getByTestId, getByText, getAllByTestId } = render(
      <MockedProvider
        mocks={[
          ...useHabitsMockQueryHasData,
          ...useHabitActivityDeleteMockQuerySuccess
        ]}
        addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    expect(getByText(useHabitsMockData[0].name)).toBeDefined()

    const habitWeekDayCheckbox = getAllByTestId('HabitWeekDay.Checkbox')[0]

    expect(habitWeekDayCheckbox.props.accessibilityState).toBeTruthy()

    fireEvent.press(habitWeekDayCheckbox)

    await waitFor(() => expect(spyToastShow).toBeCalledTimes(1))
    expect(spyToastShow).toBeCalledWith({
      text1: 'habitActivityDeletedSuccess',
      type: 'success'
    })
  })

  it('And API has Error, When I press checked Habit Week Day, Then I should see Error Message', async () => {
    jest.spyOn(Alert, 'alert')
    const { getByTestId, getByText, getAllByTestId } = render(
      <MockedProvider
        mocks={[
          ...useHabitsMockQueryHasData,
          ...useHabitActivityDeleteMockQueryError
        ]}
        addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    expect(getByText(useHabitsMockData[0].name)).toBeDefined()

    const habitWeekDayCheckbox = getAllByTestId('HabitWeekDay.Checkbox')[0]

    expect(habitWeekDayCheckbox.props.accessibilityState).toBeTruthy()

    fireEvent.press(habitWeekDayCheckbox)

    await waitFor(() => expect(Alert.alert).toBeCalledTimes(1))
    expect(Alert.alert).toHaveBeenCalledWith('errorTitle')
  })

  it('When I press unchecked Habit Week Day, Then I should see Habit Week Day checked', async () => {
    const spyToastShow = jest.spyOn(Toast, 'show')

    const { getByTestId, getByText, getAllByTestId } = render(
      <MockedProvider
        mocks={[
          ...useHabitsMockQueryHasData,
          ...useHabitActivityCreateMockQuerySuccess
        ]}
        addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    expect(getByText(useHabitsMockData[0].name)).toBeDefined()

    const habitWeekDayCheckbox = getAllByTestId('HabitWeekDay.Checkbox')[1]

    expect(habitWeekDayCheckbox.props.accessibilityState).toBeTruthy()

    fireEvent.press(habitWeekDayCheckbox)

    await waitFor(() => expect(spyToastShow).toBeCalledTimes(1))
    expect(spyToastShow).toBeCalledWith({
      text1: 'habitActivityCreatedSuccess',
      type: 'success'
    })
  })

  it('When I press Previous Period Button, Then I should see previous period', async () => {
    const periodStartDate = startOfWeek(startOfToday(), { weekStartsOn: 1 })
    const periodEndDate = endOfWeek(periodStartDate, { weekStartsOn: 1 })

    const { getByTestId, getByText, getByA11yLabel, findByText } = render(
      <MockedProvider
        mocks={[
          ...useHabitsMockQueryHasData,
          ...useHabitsMockQueryHasPreviousWeekData
        ]}
        addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    expect(
      getByText(formatDateRange(periodStartDate, periodEndDate))
    ).toBeDefined()

    fireEvent.press(getByA11yLabel('previousPeriodButtonAccessibilityLabel'))

    expect(
      await findByText(
        formatDateRange(
          subWeeks(periodStartDate, 1),
          subWeeks(periodEndDate, 1)
        )
      )
    ).toBeDefined()
  })

  it('When I press Next Period Button, Then I should see next period', async () => {
    const periodStartDate = startOfWeek(startOfToday(), { weekStartsOn: 1 })
    const periodEndDate = endOfWeek(periodStartDate, { weekStartsOn: 1 })

    const { getByTestId, getByText, getByA11yLabel, findByText } = render(
      <MockedProvider
        mocks={[
          ...useHabitsMockQueryHasData,
          ...useHabitsMockQueryHasNextWeekData
        ]}
        addTypename={false}>
        <HabitsScreen.Container />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => getByTestId('HabitsScreenSkeleton'))

    expect(
      getByText(formatDateRange(periodStartDate, periodEndDate))
    ).toBeDefined()

    fireEvent.press(getByA11yLabel('nextPeriodButtonAccessibilityLabel'))

    expect(
      await findByText(
        formatDateRange(
          addWeeks(periodStartDate, 1),
          addWeeks(periodEndDate, 1)
        )
      )
    ).toBeDefined()
  })
})
