import App, { getDefaultProps } from '~/components/app'

import React, { Component } from 'react'

export default class Widgets extends Component {
  static async getInitialProps(props) {
    const defaultProps = await getDefaultProps(props)
    return { ...defaultProps }
  }

  render() {
    return <App title="Widgets" {...this.props}><h1>Widgets</h1></App>
  }
}
