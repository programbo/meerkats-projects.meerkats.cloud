import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { auth } from '~/lib/firebase';
import { users } from '~/stores';

const Form = styled.form`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  padding: 0 20px;
  flex-direction: column;
`;

const TextInput = styled(TextField)`
  width: 100%;
  & > input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
  }
`;

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
        const { email, emailVerified, uid } = currentUser;
        users.add({ email, emailVerified, uid });
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
      <Form onSubmit={this.handleSubmit}>
        <TextInput
          floatingLabelText="Register with your Meerkats email address"
          type="email"
          id="register-email"
          name="email"
          style={{ width: '100%' }}
          onChange={this.handleInput}
          required
        />
        <TextInput
          floatingLabelText="Password"
          type="password"
          id="register-password"
          name="password"
          style={{ width: '100%' }}
          onChange={this.handleInput}
          required
        />
        <RaisedButton
          label="Register"
          style={{ margin: '20px 0' }}
          primary
          type="submit"
          onClick={this.handleSubmit}
        />
      </Form>
    );
  }
}
