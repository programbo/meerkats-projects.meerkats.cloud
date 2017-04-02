import React from 'react';
import { observer } from 'mobx-react';

import { auth, users as firebaseUsers } from '~/lib/firebase';
import { users } from '~/stores';

@observer
export default class Connect extends React.Component {
  handleConnect = async e => {
    e.preventDefault();
    try {
      const result = await auth().signInWithPopup(
        new auth.GoogleAuthProvider()
      );
      const { email, emailVerified } = result.user;
      users.add({ email, emailVerified });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div className="connect-container">
        <button className="connect" onClick={this.handleConnect}>
          {this.props.title}
        </button>
      </div>
    );
  }
}
