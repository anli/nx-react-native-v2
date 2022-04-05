import faker from '@faker-js/faker'
import { DocumentNode } from 'graphql'
import {
  HabitCreateDocument,
  HabitCreateMutation,
  HabitCreateScreenDocument,
  HabitCreateScreenQuery
} from './habit-create-screen.generated'

faker.seed(0)
const habitData = {
  name: faker.lorem.word(),
  user: { email: faker.internet.email() }
}

faker.seed()
const groups = Array.from({ length: 1 }, () => ({
  __typename: 'Group' as const,
  id: faker.datatype.uuid(),
  name: faker.lorem.word()
}))

export const habitCreateScreenData = {
  name: habitData.name,
  groups,
  user: habitData.user
}

const habitCreateScreenQueryRequest = {
  query: HabitCreateScreenDocument,
  variables: {}
}

export const habitCreateScreenQueryMockSuccess: Array<{
  request: { query: DocumentNode }
  result: { data: HabitCreateScreenQuery }
}> = [
  {
    request: habitCreateScreenQueryRequest,
    result: {
      data: {
        __typename: 'Query',
        queryGroup: habitCreateScreenData.groups
      }
    }
  }
]

export const habitCreateScreenQueryMockError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request: habitCreateScreenQueryRequest,
    error: new Error('An error occurred')
  }
]

const habitCreateMutationRequest = {
  query: HabitCreateDocument,
  variables: {
    input: {
      name: habitCreateScreenData.name,
      user: habitCreateScreenData.user
    }
  }
}

export const habitCreateMutationMockSuccess: Array<{
  request: { query: DocumentNode }
  result: { data: HabitCreateMutation }
}> = [
  {
    request: habitCreateMutationRequest,
    result: {
      data: {
        __typename: 'Mutation',
        addHabit: { __typename: 'AddHabitPayload', numUids: 1 }
      }
    }
  }
]

export const habitCreateMutationMockError: Array<{
  request: { query: DocumentNode }
  error: Error
}> = [
  {
    request: habitCreateMutationRequest,
    error: new Error('An error occurred')
  }
]

const habitCreateMutationWithGroupRequest = {
  query: HabitCreateDocument,
  variables: {
    input: {
      name: habitCreateScreenData.name,
      user: habitCreateScreenData.user,
      group: { id: habitCreateScreenData.groups[0].id }
    }
  }
}

export const habitCreateMutationWithGroupMockSuccess: Array<{
  request: { query: DocumentNode }
  result: { data: HabitCreateMutation }
}> = [
  {
    request: habitCreateMutationWithGroupRequest,
    result: {
      data: {
        __typename: 'Mutation',
        addHabit: { __typename: 'AddHabitPayload', numUids: 1 }
      }
    }
  }
]
