import { observer } from 'mobx-react';
import classnames from 'classnames';
import styled from 'styled-components';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import { red600, red900 } from 'material-ui/styles/colors';

import { todos } from '~/stores';

const handleToggle = ({ target: { id } }, completed) => {
  todos.set(id, completed);
};

const handleEdit = ({ target: { name, value } }) => {
  todos.edit(name, value);
};

const handleAdd = ({ key, target }) => {
  if (key === 'Enter') {
    todos.add(target.value);
    target.value = '';
  }
};

const handleRemove = id => {
  todos.remove(id);
};

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
`;

const action = {
  width: '24px'
};

export default observer(() => (
  <Table selectable={false}>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn colSpan="2">
          <Task
            hintText="Add a task"
            style={{ lineHeight: '20px' }}
            onKeyPress={handleAdd}
          />
        </TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      {todos.sortedValues.map(({ id, task, completed }) => (
        <TableRow key={id}>
          <TableRowColumn style={action}>
            <Checkbox id={id} onCheck={handleToggle} checked={completed} />
          </TableRowColumn>
          <TableRowColumn className={classnames({ completed })}>
            <Task name={id} defaultValue={task} onChange={handleEdit} />
          </TableRowColumn>
          <TableRowColumn style={action} className={classnames({ completed })}>
            <IconButton name={id} onTouchTap={handleRemove.bind(this, id)}>
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
));
