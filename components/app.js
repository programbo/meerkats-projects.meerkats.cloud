import { observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Toolbar from '~/components/toolbar'
import { app } from '~/stores'
// import Loading from '~/components/loading'
import Settings from '~/components/settings'
import { AuthPanel } from '~/components/auth'
import { Head } from '~/components/layout'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
try {
  injectTapEventPlugin()
}
catch (e) {}

export const getDefaultProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  if (req) {
    const userSnapshot = await req.firebase
      .database()
      .ref(`users/${req.session.user.uid}`)
      .once('value')
    app.user = userSnapshot.val()
    return { user: app.user, userAgent }
  }
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
          {app.user
            ? <div><Toolbar /><Settings />{this.props.children}</div>
            : <AuthPanel />}
        </MuiThemeProvider>
        {process.env.NODE_ENV !== 'production' && <DevTools />}
      </div>
    )
  }
}
