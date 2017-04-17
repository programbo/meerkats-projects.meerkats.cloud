import path from 'path'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import classnames from 'classnames'
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

const AvatarContainer = styled.div`
  padding: 20px 30px 20px 20px;
`

const AvatarButton = styled.label`
  ${square('130px')}
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: 50%;
  &:after {
    ${fill()}
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    line-height: 130px;
    border-radius: 50%;
    content: '';
    opacity: 0;
    transition: opacity 1000ms ease, filter 1500ms ease;
  }
  .uploading &:after {
    content: 'Uploading...';
  }
  .optimizing:not(.uploading) &:after {
    content: 'Optimizing...';
  }
  .uploading &,
  .optimizing & {
    &:after {
      opacity: 1;
    }
    img {
      filter: blur(3px);
    }
  }
`

const UploadIcon = styled(FontIcon)`
  ${centered()}
  ${square('130px')}
  z-index: 2;
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
  state = {
    uploadingAvatar: false,
  }

  handleUpload = async ({ target: { files } }) => {
    if (files.length) {
      this.setState({ uploadingAvatar: true })
      const image = files[0]
      const avatarRef = storage.child(
        `avatars/${users.currentUser.uid}${path.extname(image.name)}`
      )
      try {
        const snapshot = await avatarRef.put(image)
        users.set(users.currentUser.uid, 'newAvatar', snapshot.downloadURL)
      }
      catch (error) {
        console.log('error', error) // eslint-disable-line no-console
      }
      finally {
        this.setState({ uploadingAvatar: false })
      }
    }
  }

  handleEdit = ({ target }) => {
    users.set(users.currentUser.uid, target.name, target.value)
  }

  render() {
    return (
      <Profile>
        <AvatarContainer
          className={classnames({
            optimizing: users.currentUser.newAvatar,
            uploading: this.state.uploadingAvatar,
          })}
        >
          <AvatarButton>
            <Avatar
              size={130}
              src={users.currentUser.avatar}
              style={{ position: 'absolute' }}
            />
            {(this.state.uploadingAvatar || users.currentUser.newAvatar) &&
              <CircularProgress
                size={130}
                thickness={7}
                style={{ position: 'absolute', zIndex: 1 }}
              />}
            <UploadIcon
              className="fa fa-upload"
              color="white"
              style={{ fontSize: 48, lineHeight: '130px' }}
            />
            <ImageInput type="file" onChange={this.handleUpload} />
          </AvatarButton>
        </AvatarContainer>
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
