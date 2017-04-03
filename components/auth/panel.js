import styled from 'styled-components';
import Divider from 'material-ui/Divider';
import { Tabs, Tab } from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';

import { Login, Register, Connect } from '~/components/auth';
import { centered } from '~/components/elements/styles';

const AuthPanel = styled.div`
  ${centered()}
  width: 400px;
  max-width: 90%;
`;

export default () => (
  <AuthPanel>
    <Tabs>
      <Tab label="Login">
        <Login />
      </Tab>
      <Tab label="Register">
        <Register />
      </Tab>
    </Tabs>
    <Divider />
    <Connect label="Connect using Google" />
  </AuthPanel>
);
