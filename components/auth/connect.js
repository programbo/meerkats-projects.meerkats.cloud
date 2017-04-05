import { observer } from 'mobx-react';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

import { auth, users as firebaseUsers } from '~/lib/firebase';
import { users } from '~/stores';

const ConnectContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
`;

@observer
export default class Connect extends React.Component {
  handleConnect = async e => {
    e.preventDefault();
    try {
      const result = await auth().signInWithPopup(
        new auth.GoogleAuthProvider()
      );
      const { email, emailVerified, uid } = result.user;
      users.add({ email, emailVerified, uid });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <ConnectContainer>
        <RaisedButton
          label={this.props.label}
          onClick={this.handleConnect}
          secondary
          style={{ width: '100%' }}
          icon={
            <FontIcon className="fa fa-google" style={{ marginTop: '-3px' }} />
          }
        />
      </ConnectContainer>
    );
  }
}
