import path from 'path'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import classnames from 'classnames'
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon'
import CircularProgress from 'material-ui/CircularProgress'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'
import ChipInput from 'material-ui-chip-input'

import { square, fill, centered, media } from '~/components/elements/styles'
import { storage } from '~/lib/firebase'
import { app, users } from '~/stores'

const styles = {
  avatar: {
    position: 'absolute',
  },
  uploadIcon: {
    fontSize: 48,
    lineHeight: '130px',
    circularProgress: {},
    position: 'absolute',
    zIndex: 1,
  },
  toggle: {
    width: 'auto',
    margin: '20px 0 0 15px',
  },
  profileInput: {
    width: '100%',
  },
}

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
  margin: 0 auto;
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
  html.no-touchevents *:hover > & {
    opacity: 1;
  }
`

const Profile = styled.div`
  display: flex;
  padding: 0 20px;
  flex-flow: column nowrap;
  ${media.tablet`
    font-size: 14px
    padding: 0;
    flex-flow: row nowrap;
  `}
`

const ProfileDetails = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  margin-top: 10px;
  padding-right: 20px;
`

@observer
export default class Preferences extends React.Component {
  state = {
    uploadingAvatar: false,
  };

  handleUpload = async ({ target: { files } }) => {
    if (files.length) {
      this.setState({ uploadingAvatar: true })
      const image = files[0]
      const avatarRef = storage.child(
        `avatars/${app.user.uid}${path.extname(image.name)}`
      )
      try {
        const snapshot = await avatarRef.put(image)
        users.set(app.user.uid, 'newAvatar', snapshot.downloadURL)
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
    users.set(app.user.uid, target.name, target.value)
  };

  handleToggle = ({ target }, checked) => {
    users.set(app.user.uid, target.name, checked)
  };

  handleGroups = chips => {
    users.set(app.user.uid, 'groups', chips)
  };

  render() {
    return (
      <Profile>
        <AvatarContainer
          className={classnames({
            optimizing: app.user.newAvatar,
            uploading: this.state.uploadingAvatar,
          })}
        >
          <AvatarButton>
            <Avatar size={130} src={app.user.avatar} style={styles.avatar} />
            {(this.state.uploadingAvatar || app.user.newAvatar) &&
              <CircularProgress
                size={130}
                thickness={7}
                style={styles.circularProgress}
              />}
            <UploadIcon
              className="fa fa-upload"
              color="white"
              style={styles.uploadIcon}
            />
            <ImageInput type="file" onChange={this.handleUpload} />
          </AvatarButton>
          {app.user.admin &&
            <Toggle
              label="Admin"
              name="admin"
              labelPosition="right"
              style={styles.toggle}
              onToggle={this.handleToggle}
              toggled={app.user.admin}
            />}
        </AvatarContainer>
        <ProfileDetails>
          <TextField
            name="firstName"
            floatingLabelText="First name"
            value={app.user.firstName}
            style={styles.profileInput}
            onChange={this.handleEdit}
          />
          <TextField
            name="lastName"
            floatingLabelText="Last name"
            value={app.user.lastName}
            style={styles.profileInput}
            onChange={this.handleEdit}
          />
          <TextField
            name="displayName"
            floatingLabelText="Display name (optional)"
            hintText={`${app.user.firstName} ${app.user.lastName}`}
            value={app.user.displayName}
            style={styles.profileInput}
            onChange={this.handleEdit}
          />
          <TextField
            floatingLabelText="Email address"
            value={app.user.email}
            style={styles.profileInput}
            readOnly
          />
          <TextField
            name="jobTitle"
            floatingLabelText="Job title"
            value={app.user.jobTitle}
            style={styles.profileInput}
            onChange={this.handleEdit}
          />
          <ChipInput
            floatingLabelText="Groups"
            onChange={this.handleGroups}
            fullWidth
            fullWidthInput
            defaultValue={Array.from(app.user.groups || [])}
            dataSource={users.groups}
          />
        </ProfileDetails>
      </Profile>
    )
  }
}
