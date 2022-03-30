import { DocumentNode } from 'graphql'
import { useHabitsMockData } from '../../habit'
import {
  HabitActivityDeleteDocument,
  HabitActivityDeleteMutation
} from './use-habit-activity-delete.generated'

export const useHabitActivityDeleteMockData = useHabitsMockData
  .find(Boolean)
  ?.habitActivities.find(Boolean)

const request = {
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
    request,
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
    request,
    error: new Error('An error occurred')
  }
]