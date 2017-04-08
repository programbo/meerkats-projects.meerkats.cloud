/* global it, expect, describe */

// import React from 'react'
// import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import ReactShallowRenderer from 'react-test-renderer/shallow'

import App from '~/pages/index.js'

describe('With Enzyme', () => {
  it('App shows "All projects"', () => {
    const renderer = new ReactShallowRenderer()
    renderer.render(<App />)
    const app = renderer.getRenderOutput()
    expect(app.props.children).toEqual(<h1>All Projects</h1>)
  })
})

describe('With Snapshot Testing', () => {
  it('renders correctly', () => {
    const component = renderer.create(<App />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
