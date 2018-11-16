import React from 'react'
import { Link } from 'react-router-dom'

class Users extends React.Component {

  logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('blogUser')
    window.location.reload()
  }

  render() {
    return (
      <div>
        <h2>Blogs</h2>
        <form onSubmit={this.logout}>
          <p>{this.props.user.name} logged in&nbsp; <button type="submit">logout</button>
          </p>
        </form>
        <h3>Users</h3>
        <table>
          <tbody>
            <tr><td></td><td>blogs added</td></tr>
            {this.props.users
              .map(user =>
                <tr key={user.id}>
                  <td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Users
