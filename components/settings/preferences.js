import path from 'path';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

import { square, fill } from '~/components/elements/styles';
import { storage } from '~/lib/firebase';
import { currentUser, users } from '~/stores';

const ImageInput = styled.input`
  ${fill()}
  cursor: pointer;
  opacity: 0;
`;

const AvatarButton = styled.label`
  ${square('120px')}
  position: relative;
  display: block;
  padding: 20px;
`;

@observer
export default class Preferences extends React.Component {
  state = { uploadingAvatar: false };

  handleUpload = async ({ target: { files } }) => {
    if (files.length) {
      this.setState({ uploadingAvatar: true });
      const image = files[0];
      const extension = path.extname(image.name);
      const avatarRef = storage.child(
        `avatars/${currentUser.user.uid}_${image.name}${extension}`
      );
      try {
        const snapshot = await avatarRef.put(image);
        users.set(currentUser.user.uid, 'avatar', snapshot.downloadURL);
      } catch (error) {
        console.log('error', error); // eslint-disable-line no-console
      } finally {
        this.setState({ uploadingAvatar: false });
      }
    }
  };

  render() {
    return (
      <div>
        <AvatarButton>
          <Avatar
            size={120}
            src={currentUser.profile.avatar}
            style={{ position: 'absolute' }}
          />
          {this.state.uploadingAvatar &&
            <CircularProgress size={120} thickness={7} />}
          <ImageInput type="file" onChange={this.handleUpload} />
        </AvatarButton>
      </div>
    );
  }
}
