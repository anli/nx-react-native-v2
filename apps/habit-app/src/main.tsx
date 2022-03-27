import Heap from '@heap/react-native-heap'
import * as Sentry from '@sentry/react-native'
import { AppRegistry, LogBox } from 'react-native'
import Config from 'react-native-config'
import { App } from './app'
import './wdyr'

LogBox.ignoreLogs([
  'Require cycle: node_modules/react-native/Libraries/Network/fetch.js -> node_modules/whatwg-fetch/dist/fetch.umd.js -> node_modules/react-native/Libraries/Network/fetch.js',
  'Setting a timer', // split library
  "EventEmitter.removeListener('appStateDidChange', ...): Method has been deprecated" // split library
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

AppRegistry.registerComponent('main', () => Sentry.wrap(App))
