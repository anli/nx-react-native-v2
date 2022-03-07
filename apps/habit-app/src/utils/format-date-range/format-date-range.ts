/* istanbul ignore file */

import { format, isSameMonth } from 'date-fns'

export const formatDateRange = (startDate: Date, endDate: Date): string => {
  const endDateFormat = isSameMonth(startDate, endDate) ? 'd' : 'MMM d'
  return `${format(startDate, 'MMM d')} - ${format(endDate, endDateFormat)}`
}
