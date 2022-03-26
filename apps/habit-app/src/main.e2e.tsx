import { AppRegistry, LogBox } from 'react-native'
import { App } from './app'

LogBox.ignoreLogs([
  'Require cycle: node_modules/react-native/Libraries/Network/fetch.js -> node_modules/whatwg-fetch/dist/fetch.umd.js -> node_modules/react-native/Libraries/Network/fetch.js'
])

AppRegistry.registerComponent('main', () => App)
