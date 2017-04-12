import FlatButton from 'material-ui/FlatButton'
import { red600, red900 } from 'material-ui/styles/colors'

export default props => (
  <FlatButton
    label="Logout"
    backgroundColor={red600}
    hoverColor={red900}
    {...props}
  />
)
