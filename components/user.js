import { observer } from 'mobx-react';
import { TableRow, TableRowColumn } from 'material-ui/Table';

export default observer(({ email }) => (
  <TableRow>
    <TableRowColumn>Picture</TableRowColumn>
    <TableRowColumn>{email}</TableRowColumn>
  </TableRow>
));
