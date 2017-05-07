import { observer } from 'mobx-react'
import styled from 'styled-components'
import IconButton from 'material-ui/IconButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import { Tabs, Tab } from 'material-ui/Tabs'

import { app } from '~/stores'
import Projects from '~/components/settings/projects'
import Users from '~/components/settings/users'
import Profile from '~/components/settings/profile'
import LogoutButton from '~/components/auth/logout'
import { media } from '~/components/elements/styles'

import { auth } from '~/lib/firebase'

const styles = {
  dialogBody: { padding: '0 0 20px' },
  logoutButton: { float: 'left', color: 'white' },
}

const ResponsiveTabs = styled(Tabs)`
  button div {
    font-size: 0;
    ${media.tablet`
      font-size: 14px
    `}
  }
`
@observer
export default class SettingsPanel extends React.Component {
  handleOpen = () => {
    app.showSettings = true
  };

  handleClose = () => {
    app.showSettings = false
  };

  handleLogout = async () => {
    app.block()
    this.handleClose()
    auth().signOut()
  };

  render() {
    const actions = [
      <LogoutButton
        onTouchTap={this.handleLogout}
        style={styles.logoutButton}
      />,
      <FlatButton label="Close" primary={true} onTouchTap={this.handleClose} />,
    ]
    return (
      <div className="settings">
        <Dialog
          actions={actions}
          modal={false}
          open={app.showSettings}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          bodyStyle={styles.dialogBody}
          contentStyle={{ width: '90%' }}
        >
          <ResponsiveTabs>
            <Tab icon={<FontIcon className="fa fa-user" />} label="PROFILE">
              <Profile />
            </Tab>
            <Tab icon={<FontIcon className="fa fa-th" />} label="PROJECTS">
              <Projects />
            </Tab>
            <Tab icon={<FontIcon className="fa fa-users" />} label="USERS">
              <Users />
            </Tab>
          </ResponsiveTabs>
        </Dialog>
      </div>
    )
  }
}
