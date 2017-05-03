import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { auth } from '~/lib/firebase'
import { app } from '~/stores'

const Form = styled.form`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  padding: 0 20px;
  flex-direction: column;
`

const TextInput = styled(TextField)`
  width: 100%;
  & > input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
  }
`

export default class Login extends React.Component {
  handleSubmit = async e => {
    e.preventDefault()
    try {
      app.block()
      await auth().signInWithEmailAndPassword(
        this.state.email,
        this.state.password
      )
    }
    catch (error) {
      const { code, message } = error
      console.error(code, message)
    }
  };

  handleInput = e => {
    const { target: { name, value } } = e
    this.setState({ [name]: value })
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <TextInput
          floatingLabelText="Login with your Meerkats email address"
          type="email"
          id="login-email"
          name="email"
          fullWidth
          onChange={this.handleInput}
          required
        />
        <TextInput
          floatingLabelText="Password"
          type="password"
          id="login-password"
          name="password"
          fullWidth
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
    )
  }
}
