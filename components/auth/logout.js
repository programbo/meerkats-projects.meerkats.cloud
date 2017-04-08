import FlatButton from 'material-ui/FlatButton'
import { red600, red900 } from 'material-ui/styles/colors'

import { auth } from '~/lib/firebase'

const handleLogout = async () => {
  this.handleClose()
  auth().signOut()
}

export default () => (
  <FlatButton
    label="Logout"
    backgroundColor={red600}
    hoverColor={red900}
    onTouchTap={handleLogout}
    style={{ float: 'left', color: 'white' }}
  />
)
