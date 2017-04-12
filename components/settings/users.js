import { observer } from 'mobx-react'
import Avatar from 'material-ui/Avatar'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

import { users } from '~/stores'

export default observer(() => (
  <Table>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn style={{ width: '50px' }}>Avatar</TableHeaderColumn>
        <TableHeaderColumn>Display Name</TableHeaderColumn>
        <TableHeaderColumn>Email</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      {users.values.length &&
        users.values.map(({ email, displayName, avatar }, index) => (
          <TableRow key={index}>
            <TableRowColumn style={{ width: '50px' }}>
              {avatar
                ? <Avatar src={avatar} />
                : <Avatar>{email[0].toUpperCase()}</Avatar>}
            </TableRowColumn>
            <TableRowColumn>{displayName}</TableRowColumn>
            <TableRowColumn>{email}</TableRowColumn>
          </TableRow>
        ))}
    </TableBody>
  </Table>
))
