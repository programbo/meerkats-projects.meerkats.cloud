import path from 'path';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import CircularProgress from 'material-ui/CircularProgress';

import { square, fill, centered } from '~/components/elements/styles';
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
  margin: 20px;
`;

const UploadIcon = styled(FontIcon)`
  ${centered()}
  ${square('120px')}
  line-height: 120px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  opacity: 0.0001;
  transition: opacity 500ms ease;
  *:hover > & {
    opacity: 1;
  }
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
            src={users.currentUser.avatar}
            style={{ position: 'absolute' }}
          />
          {this.state.uploadingAvatar &&
            <CircularProgress size={120} thickness={7} />}
          <UploadIcon
            className="fa fa-upload"
            color="white"
            style={{ fontSize: 48, lineHeight: '120px' }}
          />
          <ImageInput type="file" onChange={this.handleUpload} />
        </AvatarButton>
        <pre>{JSON.stringify(users.currentUser)}</pre>
      </div>
    );
  }
}
