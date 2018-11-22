import React from 'react'
import Notification from '../components/Notification'
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newComment: ''
    }
  }

  handleCommentChange = (event) => {
    event.preventDefault()
    this.setState({ newComment: event.target.value })
  }

  likeThisBlog = async (event) => {
    event.preventDefault()
    let blog = this.props.blogs.find((element) => {
      return element.id === event.target.getAttribute("id")
    })
    blog.likes++
    try {
      await this.props.likeBlog(blog, this.props.theUser.token)
    }
    catch (exception) {
      this.props.notify('Error performing like functionality', 'error', 5)
    }
  }

  deleteThisBlog = async (event) => {
    event.preventDefault()
    let delId = event.target.getAttribute("id")
    let deleteBlog = this.props.blogs.find((element) => {
      return element.id === delId
    })
    try {
      if (window.confirm(`delete ${deleteBlog.title} by ${deleteBlog.author}`)) {        
        this.props.deleteBlog(deleteBlog, this.props.theUser.token)
        window.location.replace('/');
      }
    }
    catch (exception) {
      this.props.notify('Error deleting blog', 'error', 5)
    }
  }

  commentThisBlog = async (event) => {
    event.preventDefault()
    let blogId = event.target.getAttribute("id")
    let blog = this.props.blogs.find((element) => {
      return element.id === blogId
    })
    try {
      if (this.state.newComment !== undefined && this.state.newComment !== '') {
        let comment = this.state.newComment
        await this.props.commentBlog(blog, comment)
        this.setState({ newComment: '' })
        this.props.notify(`comment: "${comment}" added`, 'info', 5)
      }
    }
    catch (exception) {
      this.props.notify('Error commenting blog', 'error', 5)
    }
  }

  render() {
    let blog = this.props.blogs.find(a => a.id === this.props.blogId)
    if (blog.comments === undefined) blog.comments = []
    let showDeleteButton = { display: '' }
    let userName = null
    if (blog && blog.user) {
      userName = blog.user.name
      if (this.props.theUser && this.props.theUser.name !== blog.user.name) {
        showDeleteButton = { display: 'none' }
      }
    }
    let showUser = { display: userName ? '' : 'none' }

    if (blog) {
      return (
        <div>
          <Notification />
          <h2>{blog.title}</h2>
          <div className='blogDetail'>
            <a href={blog.url}>{blog.url}</a><br />
            <a>{blog.likes} likes <button id={blog.id} onClick={this.likeThisBlog}>like</button></a><br />
            <a style={showUser}>added by {userName}</a><br />
            <button style={showDeleteButton} id={blog.id} onClick={this.deleteThisBlog}>delete</button>
          </div>
          <div>
            <h3>Comments</h3>
            <ul>
              {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
            </ul>
          </div>
          <form >
            <div>
              <input type="text" value={this.state.newComment} onChange={this.handleCommentChange} />
              <button id={blog.id} onClick={this.commentThisBlog}>add comment</button>
            </div>
          </form>
        </div>
      )
    }
    else {
      return (<div></div>)
    }
  }
}

Blog.propTypes = {
  blogId: PropTypes.string.isRequired
}
const mapStateToProps = (state) => {
  return {
    blogs: state.blogs.blogs,
    theUser: state.users.user
  }
}
const mapDispatchToProps = {
  notify,
  likeBlog,
  deleteBlog,
  commentBlog
}
export default connect(mapStateToProps, mapDispatchToProps)(Blog)
