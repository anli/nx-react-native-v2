import Heap from '@heap/react-native-heap'
import { setup } from '@nx-react-native/shared/push-notification'
import * as Sentry from '@sentry/react-native'
import { AppRegistry, LogBox } from 'react-native'
import Config from 'react-native-config'
import 'react-native-gesture-handler'
import { App } from './app'
import './wdyr'

LogBox.ignoreLogs([
  'Require cycle: node_modules/react-native/Libraries/Network/fetch.js -> node_modules/whatwg-fetch/dist/fetch.umd.js -> node_modules/react-native/Libraries/Network/fetch.js',
  'Setting a timer', // split library
  "EventEmitter.removeListener('appStateDidChange', ...): Method has been deprecated", // split library
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!" // react-native-draggable-flatlist
])

if (Config.SENTRY_INIT === 'true') {
  Sentry.init({
    dsn: Config.SENTRY_DSN,
    tracesSampleRate: 1.0,
    environment: Config.SENTRY_ENVIRONMENT
  })
}

if (Config.HEAP_INIT === 'true') {
  Heap.setAppId(Config.HEAP_APP_ID)
}

if (Config.ONE_SIGNAL_INIT === 'true') {
  setup(Config.ONE_SIGNAL_APP_ID)
}

AppRegistry.registerComponent('main', () => Sentry.wrap(App))
