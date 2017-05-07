import { observer } from 'mobx-react'
import Avatar from 'material-ui/Avatar'
import styled from 'styled-components'
import Settings from '~/components/settings'
import app from '~/stores/app'
import { media } from '~/components/elements/styles'

const avatarStyle = {
  marginTop: '1px',
}

const Profile = styled.div`
  display: flex;
  margin: 0 20px;
  text-align: right;
  white-space: nowrap;
  cursor: pointer;
`

const Text = styled.div`
  display: none;
  margin-right: 10px;
  flex-direction: column;
  justify-content: center;
  ${media.tablet`
    display: flex;
  `}
`

const Name = styled.h5`
  margin: 0
`

const Position = styled.h6`
  margin: 0
`

const handleClick = () => {
  app.showSettings = true
}

export default observer(({
  user: { displayName, firstName, lastName, jobTitle, avatar },
}) => (
  <Profile onClick={handleClick}>
    <Text>
      <Name>{displayName || `${firstName} ${lastName}`}</Name>
      {jobTitle && <Position>{jobTitle}</Position>}
    </Text>
    {avatar
      ? <Avatar src={avatar} size={36} style={avatarStyle} />
      : <Avatar size={36}>JL</Avatar>}
    <Settings />
  </Profile>
))
