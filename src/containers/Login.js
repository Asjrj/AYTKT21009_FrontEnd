import React from 'react'
import loginService from '../services/login'
import LoginForm from '../components/LoginForm'
import Notification from '../components/Notification'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value })
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      this.props.login(user)
    }
    catch (exception) {
      this.props.notify('Invalid username or password', 'error', 5)
    }
  }

  render() {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm
          username={this.state.username}
          password={this.state.password}
          handleUsernameChange={this.handleUsernameChange}
          handlePasswordChange={this.handlePasswordChange}
          login={this.handleLogin}
        ></LoginForm>
      </div >
    )
  }
}

export default connect(null, { notify })(Login)