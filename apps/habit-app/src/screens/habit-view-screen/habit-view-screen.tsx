import {
  Screen,
  SkeletonPlaceholderScreen,
  Text,
  Theme,
  View
} from '@nx-react-native/shared/ui'
import { rgbToHex } from '@nx-react-native/shared/utils'
import { useApolloResult } from '@nx-react-native/shared/utils-apollo-provider'
import { formatDateRange } from '@nx-react-native/shared/utils-date'
import SegmentedControl, {
  NativeSegmentedControlIOSChangeEvent
} from '@react-native-segmented-control/segmented-control'
import { RouteProp, useRoute } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import {
  addMonths,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  formatISO,
  isSameWeek,
  startOfMonth,
  startOfWeek
} from 'date-fns'
import React, { Suspense, useCallback, useRef, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { NativeSyntheticEvent, Vibration } from 'react-native'
import { LineGraph } from 'react-native-graph'
import { GraphPoint } from 'react-native-graph/lib/typescript/LineGraphProps'
import { ErrorScreen } from '..'
import { RootStackParamList } from '../../app'
import { useHabitViewScreenSubscription } from './habit-view-screen.generated'

const options = {
  title: ''
}

const Component = (): JSX.Element => {
  const { t } = useTranslation(['HabitViewScreen'])
  const theme = useTheme<Theme>()
  const [graphSegmentIndex, setGraphSegmentIndex] = useState<number>(0)
  const {
    params: { id }
  } = useRoute<RouteProp<RootStackParamList, 'HabitViewScreen'>>()
  const { data: _data } = useApolloResult(
    useHabitViewScreenSubscription({
      variables: {
        id
      }
    })
  )
  const habitActivities = _data?.getHabit?.habitActivities ?? []
  // difficult to test
  /* istanbul ignore next */
  const startOfWeekInterval =
    graphSegmentIndex === 0
      ? startOfWeek(startOfMonth(new Date()), { weekStartsOn: 1 })
      : startOfWeek(startOfMonth(addMonths(new Date(), -3)), {
        weekStartsOn: 1
      })
  const weekInterval = eachWeekOfInterval(
    {
      start: startOfWeekInterval,
      end: startOfWeek(endOfMonth(new Date()), {
        weekStartsOn: 1
      })
    },
    { weekStartsOn: 1 }
  )
  // difficult to test
  /* istanbul ignore next */
  const graphPoints = weekInterval.map((_date) => {
    const value = habitActivities.reduce((acc, { date: habitActivityDate }) => {
      if (isSameWeek(new Date(habitActivityDate), _date, { weekStartsOn: 1 })) {
        return Number(acc) + 1
      }
      return acc
    }, 0)
    return {
      date: _date,
      value
    }
  })
  const graphPointsLastValue = graphPoints[graphPoints.length - 1]?.value
  const [graphPointValue, setGraphPointValue] =
    useState<number>(graphPointsLastValue)
  const graphPointsLastDate = graphPoints[graphPoints.length - 1]?.date
  const [graphPointDate, setGraphPointDate] = useState<string>(
    formatISO(graphPointsLastDate)
  )
  const graphDateRange = formatDateRange(
    new Date(graphPointDate),
    endOfWeek(new Date(graphPointDate), { weekStartsOn: 1 })
  )
  const isGraphReadyRef = useRef(false)

  // native component handler
  /* istanbul ignore next */
  const handlePointSelected = useCallback(
    (point: GraphPoint): void => {
      if (isGraphReadyRef.current) {
        setGraphPointValue(point.value)
        setGraphPointDate(formatISO(point.date))
      }
    },
    [setGraphPointValue]
  )

  // native component handler
  /* istanbul ignore next */
  const handleGestureStart = (): void => {
    Vibration.vibrate()
  }

  // native component handler
  /* istanbul ignore next */
  const handleGestureEnd = useCallback((): void => {
    isGraphReadyRef.current = false
    setGraphPointValue(graphPointsLastValue)
    setGraphPointDate(formatISO(graphPointsLastDate))
  }, [
    setGraphPointValue,
    graphPointsLastValue,
    setGraphPointDate,
    graphPointsLastDate
  ])

  // native component handler
  /* istanbul ignore next */
  const handleSegmentChange = (
    event: NativeSyntheticEvent<NativeSegmentedControlIOSChangeEvent>
  ): void => {
    setGraphSegmentIndex(event.nativeEvent.selectedSegmentIndex)
  }

  // native component handler
  /* istanbul ignore next */
  const handleTouchStart = (): void => {
    isGraphReadyRef.current = true
  }

  return (
    <Screen>
      <View padding="base">
        <Text variant="largeTitleEmphasized" testID="GraphTitle">
          {graphDateRange} ({graphPointValue})
        </Text>
      </View>
      <LineGraph
        onTouchStart={handleTouchStart}
        style={{
          alignSelf: 'center',
          width: '100%',
          aspectRatio: 1.4
        }}
        animated
        color={rgbToHex(theme.colors.text)}
        lineThickness={2}
        points={graphPoints}
        enablePanGesture
        onGestureStart={handleGestureStart}
        onPointSelected={handlePointSelected}
        onGestureEnd={handleGestureEnd}
      />
      <View margin="base">
        <SegmentedControl
          testID="SegmentedControl"
          values={[t('segmentThisMonth'), t('segmentLastThreeMonth')]}
          selectedIndex={graphSegmentIndex}
          onChange={handleSegmentChange}
        />
      </View>
    </Screen>
  )
}

const Container = (): JSX.Element => {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorScreen
          testID="HabitViewScreenError"
          error={error}
          resetErrorBoundary={resetErrorBoundary}
        />
      )}>
      <Suspense
        fallback={
          <SkeletonPlaceholderScreen testID="HabitViewScreenSkeleton" />
        }>
        <Screen testID="HabitViewScreen">
          <Component />
        </Screen>
      </Suspense>
    </ErrorBoundary>
  )
}

export const HabitViewScreen = {
  Container,
  options
}
