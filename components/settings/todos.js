import { observer } from 'mobx-react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

import { todos } from '~/stores';
console.log('todos.values', todos.values); // eslint-disable-line no-console

const handleToggle = rows => {
  rows.forEach(row => {
    const { id } = todos.values[row];
    console.log('id', id); // eslint-disable-line no-console
  });
};

export default observer(() => (
  <Table multiSelectable onRowSelection={handleToggle}>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>Tasks</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      {todos.values.map(({ id, task }) => (
        <TableRow key={id}>
          <TableRowColumn>{task}</TableRowColumn>
        </TableRow>
      ))}
    </TableBody>
  </Table>
));
