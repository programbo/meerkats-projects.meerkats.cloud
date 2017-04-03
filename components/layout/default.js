import React from 'react';
import { when } from 'mobx';
import { observer } from 'mobx-react';
// import DevTools from 'mobx-react-devtools';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { currentUser } from '~/stores';
import CurrentUser from '~/components/currentUser';
import Loading from '~/components/loading';
import Settings from '~/components/settings';
import { AuthPanel, Logout } from '~/components/auth';
import { Head } from '~/components/layout';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
try {
  injectTapEventPlugin();
} catch (e) {}

const muiTheme = getMuiTheme({
  userAgent: 'all'
});

@observer
export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ready: false };
  }

  componentDidMount() {
    when(
      () => currentUser.pending === false,
      () => {
        this.setState({ ready: true });
      }
    );
  }

  render() {
    return (
      <div>
        <Head />
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            {currentUser.loggedIn && <Settings />}
            {this.state.ready
              ? currentUser.loggedIn ? this.props.children : <AuthPanel />
              : <Loading />}
          </div>
        </MuiThemeProvider>
        {/* <DevTools /> */}
      </div>
    );
  }
}
