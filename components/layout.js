import React from 'react';
import Head from 'next/head';
import { when } from 'mobx';
import { observer } from 'mobx-react';
// import DevTools from 'mobx-react-devtools';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { green100, green500, green700 } from 'material-ui/styles/colors';

import { currentUser } from '~/stores';
import CurrentUser from '~/components/currentUser';
import Loading from '~/components/loading';
import { AuthPanel, Logout } from '~/components/auth';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
try {
  injectTapEventPlugin();
} catch (e) {}

const renderLoggedIn = children => (
  <div>
    <CurrentUser />
    <Logout />
    {children}
  </div>
);

const renderLoading = () => <Loading />;

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
        <Head>
          <title>{this.props.title || 'Projects'}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Open+Sans|Roboto:300,500,900"
          />
          <style>
            {
              `
              body {
                margin: 0;
                padding: 40px;
                font-size: 16px;
                font-weight: 300;
                font-family: 'Open Sans', sans-serif;
              }
              h1, h2, h3, h4, h5, h6 {
                font-weight: 900;
                font-family: 'Roboto', sans-serif;
              }
            `
            }
          </style>
        </Head>
        <MuiThemeProvider muiTheme={muiTheme}>
          {this.state.ready
            ? currentUser.loggedIn
                ? renderLoggedIn(this.props.children)
                : <AuthPanel />
            : renderLoading()}
        </MuiThemeProvider>
        {/* <DevTools /> */}
      </div>
    );
  }
}
