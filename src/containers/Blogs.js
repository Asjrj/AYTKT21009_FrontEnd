import React from 'react'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import Notification from '../components/Notification'
import Togglable from '../components/Togglable'
import PropTypes from 'prop-types'
import { addBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


class Blogs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newTitle: '',
      newAuthor: '',
      newUrl: ''
    }
  }

  handleTitleChange = () => {
    return (event) => {
      event.preventDefault()
      this.setState({ newTitle: event.target.value })
    }
  }

  handleAuthorChange = () => {
    return (event) => {
      event.preventDefault()
      this.setState({ newAuthor: event.target.value })
    }
  }

  handleUrlChange = () => {
    return (event) => {
      event.preventDefault()
      this.setState({ newUrl: event.target.value })
    }
  }

  handleCreate = () => {
    return async (event) => {
      event.preventDefault()
      if (this.state.newTitle === '' || this.state.newAuthor === '' || this.state.newUrl === '') {
        this.props.notify('Title, author and url must be given', 'error', 5)
        return
      }
      const newBlog = {
        id: "123",
        title: this.state.newTitle,
        author: this.state.newAuthor,
        url: this.state.newUrl
      }
      try {
        await this.props.addBlog(newBlog, this.props.user.token)
        this.setState({ newTitle: '' })
        this.setState({ newAuthor: '' })
        this.setState({ newUrl: '' })
        this.blogForm.toggleVisibility()
        this.props.notify(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'info', 5)
      }
      catch (exception) {
        this.props.notify('Error creating a new blog', 'error', 5)
      }
    }
  }

  render() {
    return (
      <div>
        <Notification />
        {this.props.blogs
          .sort((a, b) => a.likes > b.likes ? -1 : (a.likes < b.likes ? 1 : 0))
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
            />
          )}
        <h2>Create new</h2>
        <Togglable buttonLabel="new blog" ref={component => this.blogForm = component}>
          <BlogForm
            tila={this.state}
            handleTitleChange={this.handleTitleChange()}
            handleAuthorChange={this.handleAuthorChange()}
            handleUrlChange={this.handleUrlChange()}
            handleCreate={this.handleCreate()}
          ></BlogForm>
        </Togglable>
      </div>
    )
  }
}

Blogs.propTypes = {
  user: PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
  return {
    blogs: state.blogs.blogs
  }
}
const mapDispatchToProps = {
  notify,
  addBlog
}
export default connect(mapStateToProps, mapDispatchToProps)(Blogs)
