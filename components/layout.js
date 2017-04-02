import React from 'react';
import { when } from 'mobx-react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import { currentUser } from '~/stores';
import { auth } from '~/lib/firebase';
import CurrentUser from '~/components/currentUser';
import { Login, Logout, Register, Connect } from '~/components/auth';

const renderLoggedIn = children => (
  <div>
    <CurrentUser />
    <Logout />
    {children}
  </div>
);

const renderLoggedOut = () => (
  <div>
    <Login />
    <Register />
    <Connect provider="google" title="Connect using Google" />
  </div>
);

const renderLoading = () => <h1>Loading</h1>;

@observer
export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ready: false };
  }

  componentDidMount() {
    auth().onAuthStateChanged(() => {
      this.setState({ ready: true });
    });
  }

  render() {
    return (
      <div>
        {this.state.ready
          ? currentUser.loggedIn
              ? renderLoggedIn(this.props.children)
              : renderLoggedOut()
          : renderLoading()}
        <DevTools />
      </div>
    );
  }
}
