import { observer } from 'mobx-react';
import classnames from 'classnames';
import styled from 'styled-components';
import Checkbox from 'material-ui/Checkbox';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

import { todos } from '~/stores';

const handleToggle = (e, completed) => {
  todos.set(e.target.id, completed);
};

const Task = styled.span`
  .completed & {
    opacity: 0.5;
    text-decoration: line-through;
    transition: opacity 0.3s ease;
  }
`;

export default observer(() => (
  <Table selectable={false}>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>Tasks</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      {todos.values.map(({ id, task, completed }) => (
        <TableRow key={id}>
          <TableRowColumn style={{ width: '24px' }}>
            <Checkbox id={id} onCheck={handleToggle} checked={completed} />
          </TableRowColumn>
          <TableRowColumn className={classnames({ completed })}>
            <Task>{task}</Task>
          </TableRowColumn>
        </TableRow>
      ))}
    </TableBody>
  </Table>
));
