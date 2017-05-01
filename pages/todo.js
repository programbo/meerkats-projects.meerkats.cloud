import React, { Component } from 'react'

import App, { getDefaultProps } from '~/components/app'
import Todos from '~/components/todos'
import { todos } from '~/stores'

class Todo extends Component {
  static async getInitialProps(props) {
    const defaultProps = await getDefaultProps(props)
    if (props.req) {
      todos.items = await this.getTodos(props.req.firebase)
    }
    return { ...defaultProps, todos: todos.items }
  }

  static async getTodos(firebase) {
    const todosSnapshot = await firebase.database().ref('todos').once('value')
    return todosSnapshot.val()
  }

  componentWillMount() {
    todos.items = this.props.todos
  }

  render() {
    return (
      <App title="Todo" {...this.props}>
        <h1>
          Todo
        </h1>
        <Todos />
      </App>
    )
  }
}

export default Todo
