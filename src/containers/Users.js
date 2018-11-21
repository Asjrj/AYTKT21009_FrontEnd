import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Users extends React.Component {
  render() {
    return (
      <div>
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

const mapStateToProps = (state) => {
  return {
    users: state.users.users
  }
}

export default connect(mapStateToProps)(Users)
