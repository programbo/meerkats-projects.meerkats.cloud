import { reaction } from 'mobx'
import { observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Toolbar from '~/components/toolbar'
import { app, users } from '~/stores'
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
  userAgent: false,
})

@observer
export default class Layout extends React.Component {
  state = { value: false, ready: 'red' };

  componentWillMount() {
    if (this.props.secure) {
      app.block()
    }
  }

  componentDidMount() {
    this.disposal = reaction(
      () => {
        console.log('app.ready', app.ready) // eslint-disable-line no-console
        console.log('this.state.ready', this.state.ready) // eslint-disable-line no-console
        return app.ready !== this.state.ready
      },
      () => {
        console.log('app.ready!!!', app.ready) // eslint-disable-line no-console
        this.setState({ ready: app.ready })
        console.log('users.loggedIn', users.loggedIn) // eslint-disable-line no-console
        console.log('users.currentUser', users.currentUser) // eslint-disable-line no-console
      }
    )
    if (this.props.secure) {
      app.unblock()
    }
  }

  componentWillUnmount() {
    this.disposal()
  }

  secure(children) {
    return (
      <div>
        {users.loggedIn && users.currentUser && <Settings />}
        {!app.ready || (app.ready && users.loggedIn && !users.currentUser)
          ? <Loading />
          : users.loggedIn ? children : <AuthPanel />}
      </div>
    )
  }

  public(children) {
    return (
      <div>
        <Toolbar />
        {users.loggedIn && users.currentUser && <Settings />}
        {children}
      </div>
    )
  }

  render() {
    return (
      <div>
        <Head title={this.props.title} />
        <MuiThemeProvider muiTheme={muiTheme}>
          {this.props.secure
            ? this.secure(this.props.children)
            : this.public(this.props.children)}
        </MuiThemeProvider>
        {process.env.NODE_ENV !== 'production' && <DevTools />}
      </div>
    )
  }
}
