import React from 'react'
import blogService from '../services/blogs'
import Notification from '../components/Notification'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      info: null,
      infoType: 'info'
    }
  }

  logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('blogUser')
    window.location.reload()
  }

  likeThisBlog = async (event) => {
    event.preventDefault()
    let likedBlog = this.props.blogs.find((element) => {
      return element.id === event.target.getAttribute("id")
    })
    likedBlog.likes++
    const updateBlog = {
      id: likedBlog.id,
      title: likedBlog.title,
      author: likedBlog.author,
      url: likedBlog.url,
      likes: likedBlog.likes,
      user: likedBlog.user ? likedBlog.user._id : null
    }
    try {
      await blogService.likeBlog(updateBlog, this.props.user.token)
      this.props.likeThisBlog(likedBlog)
    }
    catch (exception) {
      this.setState({ info: 'Error performing like functionality', infoType: 'error' })
      setTimeout(() => {
        this.setState({ info: null })
      }, 5000)
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
        window.location.replace('/');
        await blogService.deleteBlog(delId, this.props.user.token)
        this.props.deleteThisBlog(deleteBlog)
      }
    }
    catch (exception) {
      this.setState({ info: 'Error deleting blog', infoType: 'error' })
      setTimeout(() => {
        this.setState({ info: null })
      }, 5000)
    }
  }

  render() {
    let showDeleteButton = { display: '' }
    let userName = null
    if (this.props.blog && this.props.blog.user) {
      userName = this.props.blog.user.name
      if (this.props.user.name !== this.props.blog.user.name) {
        showDeleteButton = { display: 'none' }
      }
    }
    let showUser = { display: userName ? '' : 'none' }
    if (this.props.blog) {
      return (
        <div>
          <h2>Blogs</h2>
          <Notification message={this.state.info} type={this.state.infoType} />
          <form onSubmit={this.logout}>
            <p>{this.props.user.name} logged in&nbsp; <button type="submit">logout</button>
            </p>
          </form>
          <h2>{this.props.blog.title}</h2>
          <div className='blogDetail'>
            <a href={this.props.blog.url}>{this.props.blog.url}</a><br />
            <a>{this.props.blog.likes} likes <button id={this.props.blog.id} onClick={this.likeThisBlog}>like</button></a><br />
            <a style={showUser}>added by {userName}</a><br />
            <button style={showDeleteButton} id={this.props.blog.id} onClick={this.deleteThisBlog}>delete</button>
          </div>
        </div>
      )
    }
    else {
      return (
        <div>
          <h2>Blogs</h2>
          <form onSubmit={this.logout}>
            <p>{this.props.user.name} logged in&nbsp; <button type="submit">logout</button>
            </p>
          </form>
        </div>)
    }
  }
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  likeThisBlog: PropTypes.func, 
  deleteThisBlog: PropTypes.func
}

export default Blog
