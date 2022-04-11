import faker from '@faker-js/faker'
import {
  addDays,
  addWeeks,
  endOfWeek,
  formatISO,
  startOfToday,
  startOfWeek,
  subWeeks
} from 'date-fns'
import { DocumentNode } from 'graphql'
import {
  HabitActivityCreateDocument,
  HabitActivityCreateMutation,
  HabitActivityDeleteDocument,
  HabitActivityDeleteMutation,
  HabitDeleteDocument,
  HabitDeleteMutation,
  HabitsDocument,
  HabitsSubscription
} from './habits-screen.generated'

const habitsSubscriptionRequest = {
  query: HabitsDocument,
  variables: {
    minDate: formatISO(startOfWeek(startOfToday(), { weekStartsOn: 1 })),
    maxDate: formatISO(endOfWeek(startOfToday(), { weekStartsOn: 1 }))
  }
}

export const useHabitsMockData = Array.from({ length: 3 }, (_, i) => {
  faker.seed(i)
  return {
    __typename: 'Habit' as const,
    id: faker.datatype.uuid(),
    name: faker.lorem.word(),
    group: faker.datatype.boolean()
      ? { __typename: 'Group' as const, name: faker.lorem.word() }
      : null,
    habitActivities: [
      {
        __typename: 'HabitActivity' as const,
        id: faker.datatype.uuid(),
        date: formatISO(startOfWeek(startOfToday(), { weekStartsOn: 1 })),
        count: 1
      }
    ]
  }
})

export const useHabitsMockQueryNoData: Array<{
  request: { query: DocumentNode }
  result: { data: HabitsSubscription }
}> = [
  {
    request: habitsSubscriptionRequest,
    result: {
      data: { __typename: 'Subscription', queryHabit: [] }
    }
  }
]

export const useHabitsMockQueryHasData: Array<{
  request: { query: DocumentNode }
  result: { data: HabitsSubscription }
}> = [
  {
    request: habitsSubscriptionRequest,
    result: {
      data: { __typename: 'Subscription', queryHabit: useHabitsMockData }
    }
  }
]

export const useHabitsMockQueryError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request: habitsSubscriptionRequest,
    error: new Error('An error occurred')
  }
]

export const useHabitsMockQueryErrorTokenExpired: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request: habitsSubscriptionRequest,
    error: new Error(
      'Error: unable to parse jwt token:token is expired by 8m10.863843902s'
    )
  }
]

export const useHabitsMockQueryEmptyData: Array<{
  request: { query: DocumentNode }
  result: { data: HabitsSubscription }
}> = [
  {
    request: habitsSubscriptionRequest,
    result: {
      data: { __typename: 'Subscription', queryHabit: null }
    }
  }
]

const previousWeekRequest = {
  query: HabitsDocument,
  variables: {
    minDate: formatISO(
      subWeeks(startOfWeek(startOfToday(), { weekStartsOn: 1 }), 1)
    ),
    maxDate: formatISO(
      subWeeks(endOfWeek(startOfToday(), { weekStartsOn: 1 }), 1)
    )
  }
}

export const useHabitsMockQueryHasPreviousWeekData: Array<{
  request: { query: DocumentNode }
  result: { data: HabitsSubscription }
}> = [
  {
    request: previousWeekRequest,
    result: {
      data: { __typename: 'Subscription', queryHabit: useHabitsMockData }
    }
  }
]

const nextWeekRequest = {
  query: HabitsDocument,
  variables: {
    minDate: formatISO(
      addWeeks(startOfWeek(startOfToday(), { weekStartsOn: 1 }), 1)
    ),
    maxDate: formatISO(
      addWeeks(endOfWeek(startOfToday(), { weekStartsOn: 1 }), 1)
    )
  }
}

export const useHabitsMockQueryHasNextWeekData: Array<{
  request: { query: DocumentNode }
  result: { data: HabitsSubscription }
}> = [
  {
    request: nextWeekRequest,
    result: {
      data: { __typename: 'Subscription', queryHabit: useHabitsMockData }
    }
  }
]

export const useHabitActivityDeleteMockData = useHabitsMockData
  .find(Boolean)
  ?.habitActivities.find(Boolean)

const habitActivityDeleteRequest = {
  query: HabitActivityDeleteDocument,
  variables: {
    filter: {
      id: [useHabitActivityDeleteMockData?.id]
    }
  }
}

export const useHabitActivityDeleteMockQuerySuccess: Array<{
  request: { query: DocumentNode }
  result: { data: HabitActivityDeleteMutation }
}> = [
  {
    request: habitActivityDeleteRequest,
    result: {
      data: {
        __typename: 'Mutation',
        deleteHabitActivity: {
          __typename: 'DeleteHabitActivityPayload',
          numUids: 1
        }
      }
    }
  }
]

export const useHabitActivityDeleteMockQueryError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request: habitActivityDeleteRequest,
    error: new Error('An error occurred')
  }
]

export const useHabitActivityCreateMockData = {
  count: 1,
  date: formatISO(
    addDays(startOfWeek(startOfToday(), { weekStartsOn: 1 }), +1)
  ),
  habit: {
    id: useHabitsMockData.find(Boolean)?.id
  }
}

const habitActivityCreateRequest = {
  query: HabitActivityCreateDocument,
  variables: {
    input: {
      ...useHabitActivityCreateMockData
    }
  }
}

export const useHabitActivityCreateMockQuerySuccess: Array<{
  request: { query: DocumentNode }
  result: { data: HabitActivityCreateMutation }
}> = [
  {
    request: habitActivityCreateRequest,
    result: {
      data: {
        __typename: 'Mutation',
        addHabitActivity: { __typename: 'AddHabitActivityPayload', numUids: 1 }
      }
    }
  }
]

export const useHabitActivityCreateMockQueryError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request: habitActivityCreateRequest,
    error: new Error('An error occurred')
  }
]

export const useHabitDeleteMockData = useHabitsMockData[0]

const habitDeleteRequest = {
  query: HabitDeleteDocument,
  variables: {
    filter: {
      id: [useHabitDeleteMockData.id]
    }
  }
}

export const useHabitDeleteMockQuerySuccess: Array<{
  request: { query: DocumentNode }
  result: { data: HabitDeleteMutation }
}> = [
  {
    request: habitDeleteRequest,
    result: {
      data: {
        __typename: 'Mutation',
        deleteHabit: { __typename: 'DeleteHabitPayload', numUids: 1 }
      }
    }
  }
]

export const useHabitDeleteMockQueryError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request: habitDeleteRequest,
    error: new Error('An error occurred')
  }
]
