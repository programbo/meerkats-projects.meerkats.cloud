import { observer } from 'mobx-react'
import classnames from 'classnames'
import styled from 'styled-components'
import Checkbox from 'material-ui/Checkbox'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import TextField from 'material-ui/TextField'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import { red600, red900 } from 'material-ui/styles/colors'

import { app, todos } from '~/stores'

const Task = styled(TextField)`
  .completed & input {
    opacity: 0.3;
    text-decoration: line-through;
    transition: opacity 0.3s ease;
    &:focus {
      opacity: 1;
      text-decoration: none;
    }
  }
  hr {
    display: none;
  }
`

@observer
export default class Todos extends React.Component {
  state = { task: '' };

  action = { width: '24px' };

  handleToggle = ({ target: { id } }, completed) => {
    todos.set(id, completed)
  };

  handleEdit = ({ target: { name, value } }) => {
    todos.edit(name, value)
  };

  handleEditNewTask = ({ target: { value } }) => {
    this.setState({ task: value })
  };

  handleAddNewTask = ({ key }) => {
    if (key === 'Enter') {
      todos.add(this.state.task)
      this.setState({ task: '' })
    }
  };

  handleRemove = id => {
    todos.remove(id)
  };

  render() {
    return (
      <Table selectable={false}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn colSpan="2">
              <Task
                value={this.state.task}
                hintText="Add a task"
                style={{ lineHeight: '20px' }}
                onKeyPress={this.handleAddNewTask}
                onChange={this.handleEditNewTask}
              />
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {todos.sortedValues.map(({ id, task, completed }) => (
            <TableRow key={id}>
              <TableRowColumn style={this.action}>
                <Checkbox
                  id={id}
                  onCheck={this.handleToggle}
                  checked={completed}
                />
              </TableRowColumn>
              <TableRowColumn className={classnames({ completed })}>
                <Task
                  name={id}
                  value={task}
                  onChange={this.handleEdit}
                  style={{ width: '100%' }}
                />
              </TableRowColumn>
              <TableRowColumn
                style={this.action}
                className={classnames({ completed })}
              >
                <IconButton
                  name={id}
                  onTouchTap={this.handleRemove.bind(this, id)}
                >
                  <FontIcon
                    className="fa fa-minus-circle"
                    color={red600}
                    hoverColor={red900}
                  />
                </IconButton>
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
}
