import './wdyr'

import * as Sentry from '@sentry/react-native'
import { AppRegistry, LogBox } from 'react-native'
import { App } from './app'
import Config from 'react-native-config'

LogBox.ignoreLogs([
  'Require cycle: node_modules/react-native/Libraries/Network/fetch.js -> node_modules/whatwg-fetch/dist/fetch.umd.js -> node_modules/react-native/Libraries/Network/fetch.js'
])

Sentry.init({
  dsn: Config.SENTRY_DSN,
  tracesSampleRate: __DEV__ ? 1.0 : 0.2,
  environment: __DEV__ ? 'develop' : 'production'
})

AppRegistry.registerComponent('main', () => Sentry.wrap(App))
