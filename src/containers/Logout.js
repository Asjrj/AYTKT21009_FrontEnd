import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

class Logout extends React.Component {

  logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('blogUser')
    window.location.replace('/');
  }

  render() {
    const menuStyle = {
      fontFamily: 'Arial, Verdana',
      color: 'green',
      fontSize: 16,
      marginBottom: 10,
      padding: 10
    }
    const activeMenuStyle = {
      fontFamily: 'Arial, Verdana',
      fontWeight: 'bold',
      color: 'dark-green',
      fontSize: 16,
    }
    return (
      <div>
        <h2>Blogs</h2>
        <form onSubmit={this.logout}>
          <div style={menuStyle}>
            <NavLink exact to="/" activeStyle={activeMenuStyle}>Blogs</NavLink>&nbsp;
            <NavLink exact to="/users" activeStyle={activeMenuStyle}>Users</NavLink>&nbsp;
            <a>{this.props.user.name} logged in &nbsp;</a> <button type="submit">logout</button>
          </div>
        </form>
      </div>
    )
  }
}

Logout.propTypes = {
  user: PropTypes.object.isRequired
}

export default Logout
