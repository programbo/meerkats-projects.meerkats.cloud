import React from 'react';
import { observer } from 'mobx-react';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import { Tabs, Tab } from 'material-ui/Tabs';
import { red600, red900 } from 'material-ui/styles/colors';

import Projects from '~/components/settings/projects';
import Users from '~/components/settings/users';
import Preferences from '~/components/settings/preferences';

import { auth } from '~/lib/firebase';

@observer
export default class SettingsPanel extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleLogout = async () => {
    this.handleClose();
    auth().signOut();
  };

  render() {
    const actions = [
      (
        <FlatButton
          label="Logout"
          backgroundColor={red600}
          hoverColor={red900}
          onTouchTap={this.handleLogout}
          style={{ float: 'left', color: 'white' }}
        />
      ),
      <FlatButton label="Close" primary={true} onTouchTap={this.handleClose} />
    ];
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
            height: '100px'
          }}
          iconStyle={{ fontSize: '3rem', color: 'silver' }}
        />
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <Tabs>
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
          </Tabs>
        </Dialog>
      </div>
    );
  }
}