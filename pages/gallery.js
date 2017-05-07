import App, { getDefaultProps } from '~/components/app'

import React, { Component } from 'react'

export default class Gallery extends Component {
  static async getInitialProps(props) {
    const defaultProps = await getDefaultProps(props)
    return { ...defaultProps }
  }

  render() {
    return <App title="Gallery" {...this.props}><h1>Gallery</h1></App>
  }
}
