import { when } from 'mobx'
import { observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { users } from '~/stores'
import Loading from '~/components/loading'
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

const muiTheme = getMuiTheme({
  userAgent: 'all',
})

@observer
export default class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ready: false }
  }

  componentDidMount() {
    when(
      () => users.pending === false,
      () => {
        this.setState({ ready: true })
      },
    )
  }

  render() {
    return (
      <div>
        <Head />
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            {users.loggedIn && users.currentUser && <Settings />}
            {users.pending ||
              (!users.pending && users.loggedIn && !users.currentUser)
              ? <Loading />
              : users.loggedIn ? this.props.children : <AuthPanel />}
          </div>
        </MuiThemeProvider>
        {process.env.NODE_ENV !== 'production' && <DevTools />}
      </div>
    )
  }
}
