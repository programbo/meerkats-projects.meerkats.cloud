import path from 'path'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon'
import CircularProgress from 'material-ui/CircularProgress'
import TextField from 'material-ui/TextField'

import { square, fill, centered } from '~/components/elements/styles'
import { storage } from '~/lib/firebase'
import { users } from '~/stores'

const ImageInput = styled.input`
  ${fill()}
  cursor: pointer;
  opacity: 0;
`

const AvatarButton = styled.label`
  ${square('130px')}
  position: relative;
  display: block;
  margin: 20px;
`

const UploadIcon = styled(FontIcon)`
  ${centered()}
  ${square('130px')}
  line-height: 130px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  opacity: 0.0001;
  transition: opacity 500ms ease;
  *:hover > & {
    opacity: 1;
  }
`

const Profile = styled.div`
  display: flex;
  flex-flow: row nowrap;
`

const ProfileDetails = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  margin-top: 10px;
`

const profileInputStyle = {
  width: '100%',
}

@observer
export default class Preferences extends React.Component {
  state = { uploadingAvatar: false };

  handleUpload = async ({ target: { files } }) => {
    if (files.length) {
      this.setState({ uploadingAvatar: true })
      const image = files[0]
      const extension = path.extname(image.name)
      const avatarRef = storage.child(
        `avatars/${users.currentUser.uid}_${image.name}${extension}`,
      )
      try {
        const snapshot = await avatarRef.put(image)
        users.set(users.currentUser.uid, 'avatar', snapshot.downloadURL)
      }
      catch (error) {
        console.log('error', error) // eslint-disable-line no-console
      }
      finally {
        this.setState({ uploadingAvatar: false })
      }
    }
  };

  handleEdit = ({ target }) => {
    users.set(users.currentUser.uid, target.name, target.value)
  };

  render () {
    return (
      <Profile>
        <AvatarButton>
          <Avatar
            size={130}
            src={users.currentUser.avatar}
            style={{ position: 'absolute' }}
          />
          {this.state.uploadingAvatar &&
            <CircularProgress size={130} thickness={7} />}
          <UploadIcon
            className="fa fa-upload"
            color="white"
            style={{ fontSize: 48, lineHeight: '130px' }}
          />
          <ImageInput type="file" onChange={this.handleUpload} />
        </AvatarButton>
        <ProfileDetails>
          <TextField
            name="displayName"
            hintText="Display name"
            value={users.currentUser.displayName}
            style={profileInputStyle}
            onChange={this.handleEdit}
          />
          <TextField
            hintText="Email"
            value={users.currentUser.email}
            style={profileInputStyle}
            readOnly
          />
          <TextField
            name="jobTitle"
            hintText="Job title"
            value={users.currentUser.jobTitle}
            style={profileInputStyle}
            onChange={this.handleEdit}
          />
        </ProfileDetails>
      </Profile>
    )
  }
}
