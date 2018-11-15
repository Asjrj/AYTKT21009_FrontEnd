import React from 'react'
import userService from '../services/users'

class Users extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    userService.getAll().then(users =>
      this.setState({ users })
    )
  }

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
        <table>
          <tbody>
            <tr><td></td><td>blogs added</td></tr>
            {this.state.users
              .map(user =>
                <tr key={user.id}>
                  <td>{user.name}</td><td>{user.blogs.length}</td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Users
