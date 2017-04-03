import { observer } from 'mobx-react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

import { users } from '~/stores';

export default observer(() => (
  <Table>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn>Avatar</TableHeaderColumn>
        <TableHeaderColumn>Display Name</TableHeaderColumn>
        <TableHeaderColumn>Full Name</TableHeaderColumn>
        <TableHeaderColumn>Email</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      {users.values.length &&
        users.values.map(({ email }, index) => (
          <TableRow key={index}>
            <TableRowColumn>Picture</TableRowColumn>
            <TableRowColumn>John</TableRowColumn>
            <TableRowColumn>John Lombardo</TableRowColumn>
            <TableRowColumn>{email}</TableRowColumn>
          </TableRow>
        ))}
    </TableBody>
  </Table>
));
