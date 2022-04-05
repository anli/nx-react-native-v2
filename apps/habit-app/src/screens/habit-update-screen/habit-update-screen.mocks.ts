import faker from '@faker-js/faker'
import { DocumentNode } from 'graphql'
import {
  HabitUpdateDocument,
  HabitUpdateMutation,
  HabitUpdateScreenDocument,
  HabitUpdateScreenQuery
} from './habit-update-screen.generated'

faker.seed(0)
const habitData = {
  id: faker.datatype.uuid(),
  name: faker.lorem.word()
}

faker.seed()
const groups = Array.from({ length: 1 }, () => ({
  __typename: 'Group' as const,
  id: faker.datatype.uuid(),
  name: faker.lorem.word()
}))

export const habitUpdateScreenData = {
  id: habitData.id,
  name: habitData.name,
  groups
}

const habitUpdateScreenQueryRequest = {
  query: HabitUpdateScreenDocument,
  variables: {
    habitId: habitUpdateScreenData.id
  }
}

export const habitUpdateScreenQueryMockSuccess: Array<{
  request: { query: DocumentNode }
  result: { data: HabitUpdateScreenQuery }
}> = [
  {
    request: habitUpdateScreenQueryRequest,
    result: {
      data: {
        __typename: 'Query',
        getHabit: {
          __typename: 'Habit',
          name: habitUpdateScreenData.name,
          group: {
            __typename: 'Group',
            id: habitUpdateScreenData.groups[0].id
          }
        },
        queryGroup: habitUpdateScreenData.groups
      }
    }
  }
]

export const habitUpdateScreenQueryMockError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request: habitUpdateScreenQueryRequest,
    error: new Error('An error occurred')
  }
]

const habitUpdateMutationRequest = {
  query: HabitUpdateDocument,
  variables: {
    input: {
      filter: { id: [habitUpdateScreenData.id] },
      set: {
        name: habitUpdateScreenData.name,
        group: { id: habitUpdateScreenData.groups[0].id }
      },
      remove: {}
    }
  }
}

export const habitUpdateMutationMockSuccess: Array<{
  request: { query: DocumentNode }
  result: { data: HabitUpdateMutation }
}> = [
  {
    request: habitUpdateMutationRequest,
    result: {
      data: {
        __typename: 'Mutation',
        updateHabit: { __typename: 'UpdateHabitPayload', numUids: 1 }
      }
    }
  }
]

export const habitUpdateMutationMockError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request: habitUpdateMutationRequest,
    error: new Error('An error occurred')
  }
]

const habitUpdateMutationRequestWithGroupRemoved = {
  query: HabitUpdateDocument,
  variables: {
    input: {
      filter: { id: [habitUpdateScreenData.id] },
      set: {
        name: habitUpdateScreenData.name
      },
      remove: {
        group: { id: habitUpdateScreenData.groups[0].id }
      }
    }
  }
}

export const habitUpdateMutationWithGroupRemovedMockSuccess: Array<{
  request: { query: DocumentNode }
  result: { data: HabitUpdateMutation }
}> = [
  {
    request: habitUpdateMutationRequestWithGroupRemoved,
    result: {
      data: {
        __typename: 'Mutation',
        updateHabit: { __typename: 'UpdateHabitPayload', numUids: 1 }
      }
    }
  }
]
