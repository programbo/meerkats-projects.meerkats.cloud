import Link from 'next/link'
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar'
import styled from 'styled-components'

import MeerkatsLogo from '~/images/logo-meerkats.svg'
import MeerkatsIcon from '~/images/icon-meerkats.svg'
import Profile from '~/components/toolbar/profile'
import ProjectsMenu from '~/components/toolbar/nav'
import app from '~/stores/app'
import { media } from '~/components/elements/styles'

const Logo = styled(MeerkatsLogo)`
  display: none;
  height: 30px;
  margin-top: 2px;
  ${media.tablet`
    display: inline-block;
  `}
`
const Icon = styled(MeerkatsIcon)`
  display: inline-block;
  height: 30px;
  margin-top: 2px;
  ${media.tablet`
    display: none;
  `}
`

export default class extends React.Component {
  styles = {
    toolbarStyle: {
      backgroundColor: 'white',
    },
  };

  render() {
    return (
      <Toolbar style={this.styles.toolbarStyle}>
        <ToolbarGroup>
          <Link prefetch href="/"><a><Icon /><Logo /></a></Link>
          <ToolbarSeparator />
          <ProjectsMenu path={this.props.path} />
        </ToolbarGroup>
        <ToolbarGroup lastChild>
          {app.user && <Profile user={app.user} />}
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
