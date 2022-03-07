const RealComponent = jest.requireActual('react-native-toast-message')
const ReactInternal = require('react')
class Toast extends ReactInternal.Component {
  static show = jest.fn()
  static hide = jest.fn()

  render() {
    return ReactInternal.createElement('Toast', this.props, this.props.children)
  }
}

module.exports = Toast
