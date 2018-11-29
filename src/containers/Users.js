// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'

class Users extends React.Component {
  render() {
    return (
      <div>
        <h3>Users</h3>
        <Table striped bordered condensed>
          <tbody>
            <tr><td></td><td>blogs added</td></tr>
            {this.props.users
              .map(user =>
                <tr key={user.id}>
                  <td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td>
                </tr>
              )}
          </tbody>
        </Table>
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
