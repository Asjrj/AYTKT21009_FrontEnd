import React from 'react'
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'

const LoginForm = (props) => (
  <form onSubmit={props.login}>
    <FormGroup>
      <ControlLabel>username:</ControlLabel>
        <FormControl
          type="text"
          value={props.username}
          onChange={props.handleUsernameChange}
        />
        <ControlLabel>password:</ControlLabel>
        <FormControl
          type="password"
          value={props.password}
          onChange={props.handlePasswordChange}
        />
        <br />
      <Button type="submit" bsStyle="primary" block>Login</Button>
    </FormGroup>
  </form>
)

export default LoginForm