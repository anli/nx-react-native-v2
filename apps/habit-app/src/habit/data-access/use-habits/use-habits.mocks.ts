import faker from '@faker-js/faker'
import {
  addWeeks,
  endOfWeek,
  formatISO,
  startOfToday,
  startOfWeek,
  subWeeks
} from 'date-fns'
import { DocumentNode } from 'graphql'
import { HabitsDocument, HabitsSubscription } from './use-habits.generated'

const request = {
  query: HabitsDocument,
  variables: {
    minDate: formatISO(startOfWeek(startOfToday(), { weekStartsOn: 1 })),
    maxDate: formatISO(endOfWeek(startOfToday(), { weekStartsOn: 1 }))
  }
}

export const useHabitsMockData = Array.from({ length: 3 }, (_, i) => {
  faker.seed(i)
  return {
    id: faker.datatype.uuid(),
    name: faker.lorem.word(),
    habitActivities: [
      {
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
    request,
    result: {
      data: { queryHabit: [] }
    }
  }
]

export const useHabitsMockQueryHasData: Array<{
  request: { query: DocumentNode }
  result: { data: HabitsSubscription }
}> = [
  {
    request,
    result: {
      data: { queryHabit: useHabitsMockData }
    }
  }
]

export const useHabitsMockQueryError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request,
    error: new Error('An error occurred')
  }
]

export const useHabitsMockQueryEmptyData: Array<{
  request: { query: DocumentNode }
  result: { data: HabitsSubscription }
}> = [
  {
    request,
    result: {
      data: { queryHabit: null }
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
      data: { queryHabit: useHabitsMockData }
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
      data: { queryHabit: useHabitsMockData }
    }
  }
]
