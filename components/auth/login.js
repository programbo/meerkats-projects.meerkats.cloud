import React from 'react';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { auth } from '~/lib/firebase';

const Form = styled.form`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  padding: 0 20px;
  flex-direction: column;
`;

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    try {
      await auth().signInWithEmailAndPassword(
        this.state.email,
        this.state.password
      );
    } catch (error) {
      const { code, message } = error;
      console.error(code, message);
    }
  };

  handleInput = e => {
    const { target: { name, value } } = e;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <TextField
          floatingLabelText="Login with your Meerkats email address"
          type="email"
          id="login-email"
          name="email"
          style={{ width: '100%' }}
          onChange={this.handleInput}
          required
        />
        <TextField
          floatingLabelText="Password"
          type="password"
          id="login-password"
          name="password"
          style={{ width: '100%' }}
          onChange={this.handleInput}
          required
        />
        <RaisedButton
          label="Login"
          style={{ margin: '20px 0' }}
          primary
          type="submit"
          onClick={this.handleSubmit}
        />
      </Form>
    );
  }
}
