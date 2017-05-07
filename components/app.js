import { observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Toolbar from '~/components/toolbar'
import Loading from '~/components/loading'
import { Content } from '~/components/elements'
import { AuthPanel } from '~/components/auth'
import { Head } from '~/components/layout'
import { app } from '~/stores'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
try {
  injectTapEventPlugin()
}
catch (e) {}

export const getDefaultProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  const props = { user: app.user, userAgent }
  if (req && req.session.user) {
    const userSnapshot = await req.firebase
      .database()
      .ref(`users/${req.session.user.uid}`)
      .once('value')
    app.user = userSnapshot.val()
    return { user: app.user, userAgent }
  }
  return props
}

@observer
export default class Layout extends React.Component {
  muiTheme = getMuiTheme({ userAgent: this.props.userAgent });
  componentWillMount() {
    app.user = this.props.user
  }
  render() {
    return (
      <div>
        <Head title={this.props.title} />
        <MuiThemeProvider muiTheme={this.muiTheme}>
          {app.ready
            ? app.user
                ? <div>
                    <Toolbar path={this.props.url.pathname} />
                    <Content>{this.props.children}</Content>
                  </div>
                : <AuthPanel />
            : <Loading />}
        </MuiThemeProvider>
      </div>
    )
  }
}
