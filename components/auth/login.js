import React from 'react';

import { auth } from '~/lib/firebase';

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
      <div className="login-container">
        <form className="login--email" onSubmit={this.handleSubmit}>
          <h3>Login</h3>
          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              onChange={this.handleInput}
              required
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              name="password"
              onChange={this.handleInput}
              required
            />
          </label>
          <button className="login-button">
            Login
          </button>
        </form>
      </div>
    );
  }
}
