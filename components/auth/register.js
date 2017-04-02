import React from 'react';

import { auth } from '~/lib/firebase';
import { users } from '~/stores';

export default class Register extends React.Component {
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
      const currentUser = await auth().createUserWithEmailAndPassword(
        this.state.email,
        this.state.password
      );
      if (currentUser) {
        const { email, emailVerified } = currentUser;
        users.add({ email, emailVerified });
      }
    } catch (error) {
      const { code, message } = error;
      if (code === 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(message);
      }
      console.error(error);
    }
  };

  handleInput = e => {
    const { target: { name, value } } = e;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="register-container">
        <form className="register--email" onSubmit={this.handleSubmit}>
          <h3>Register</h3>
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
          <button className="register-button">
            Register
          </button>
        </form>
      </div>
    );
  }
}
