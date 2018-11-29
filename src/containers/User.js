import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

export class User extends React.Component {

  logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('blogUser')
    window.location.reload()
  }

  getTheBlogs = (userId) => {
    let theBlogs = []
    this.props.blogs.forEach(element => {
      if (element.user && element.user._id === userId) {
        theBlogs.push(element)
      }
    })
    return (theBlogs)
  }

  render() {
    let theUser = this.props.users.find(a => a.id === this.props.userId)
    return (
      <div>
        <h2>{theUser.name}</h2>
        <h3>Added blogs</h3>
        <ListGroup>
          {this.getTheBlogs(this.props.userId).map(blog => <ListGroupItem key={blog.id}>{blog.title} by {blog.author}</ListGroupItem>)}
        </ListGroup>
      </div>
    )
  }
}

User.propTypes = {
  blogs: PropTypes.array.isRequired
}
const mapStateToProps = (state, ownProps) => {
  return {
    blogs: state.blogs.blogs,
    users: state.users.users,
    userId: ownProps.theUserId
  }
}
export default connect(mapStateToProps)(User)
