import React from 'react'
import loginService from '../services/login'
import LoginForm from '../components/LoginForm'
import Notification from '../components/Notification'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      info: null,
      infoType: 'info',
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
      this.setState({ info: 'Invalid username or password', infoType: 'error' })
      setTimeout(() => {
        this.setState({ info: null })
      }, 5000)
    }
  }

  render() {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={this.state.info} type={this.state.infoType} />
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

export default Login