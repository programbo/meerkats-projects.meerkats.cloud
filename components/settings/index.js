import { observer } from 'mobx-react'
import styled from 'styled-components'
import IconButton from 'material-ui/IconButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import { Tabs, Tab } from 'material-ui/Tabs'

import { app } from '~/stores'
import Todos from '~/components/settings/todos'
import Projects from '~/components/settings/projects'
import Users from '~/components/settings/users'
import Preferences from '~/components/settings/preferences'
import LogoutButton from '~/components/auth/logout'
import { media } from '~/components/elements/styles'

import { auth } from '~/lib/firebase'

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
  state = {
    open: true,
  };

  handleOpen = () => {
    app.showSettings = true
  };

  handleClose = () => {
    app.showSettings = false
  };

  handleLogout = async () => {
    this.handleClose()
    auth().signOut()
  };

  render () {
    const actions = [
      <LogoutButton />,
      <FlatButton label="Close" primary={true} onTouchTap={this.handleClose} />,
    ]
    return (
      <div>
        <IconButton
          iconClassName="fa fa-cog"
          onTouchTap={this.handleOpen}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100px',
            height: '100px',
          }}
          iconStyle={{ fontSize: '3rem', color: 'silver' }}
        />
        <Dialog
          actions={actions}
          modal={false}
          open={app.showSettings}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <ResponsiveTabs>
            <Tab
              icon={<FontIcon className="fa fa-check-square-o" />}
              label="TODO"
            >
              <Todos />
            </Tab>
            <Tab icon={<FontIcon className="fa fa-th" />} label="PROJECTS">
              <Projects />
            </Tab>
            <Tab icon={<FontIcon className="fa fa-users" />} label="USERS">
              <Users />
            </Tab>
            <Tab
              icon={<FontIcon className="fa fa-sliders" />}
              label="PREFERENCES"
            >
              <Preferences />
            </Tab>
          </ResponsiveTabs>
        </Dialog>
      </div>
    )
  }
}
