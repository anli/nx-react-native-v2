const ReactInternal = require('react')
class LineGraph extends ReactInternal.Component {
  render() {
    return ReactInternal.createElement(
      'LineGraph',
      this.props,
      this.props.children
    )
  }
}

module.exports = { LineGraph }
