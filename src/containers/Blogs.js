import React from 'react'
import blogService from '../services/blogs'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import Notification from '../components/Notification'
import Togglable from '../components/Togglable'
import PropTypes from 'prop-types'


class Blogs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newTitle: '',
      newAuthor: '',
      newUrl: '',
      info: null,
      infoType: 'info'
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

  logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('blogUser')
    window.location.reload()
  }

  handleCreate = () => {
    return async (event) => {
      event.preventDefault()
      if (this.state.newTitle === '' || this.state.newAuthor === '' || this.state.newUrl === '') {
        this.setState({ info: 'Title, author and url must be given', infoType: 'error' })
        setTimeout(() => {
          this.setState({ info: null })
        }, 5000)
        return
      }
      const newBlog = {
        id: "123",
        title: this.state.newTitle,
        author: this.state.newAuthor,
        url: this.state.newUrl
      }
      try {
        let addedBlog = await blogService.addBlog(newBlog, this.props.user.token)
        addedBlog.id = addedBlog._id
        this.props.addBlog(addedBlog)
        this.setState({ newTitle: '' })
        this.setState({ newAuthor: '' })
        this.setState({ newUrl: '' })
        this.blogForm.toggleVisibility()
        this.setState({ info: `a new blog ${newBlog.title} by ${newBlog.author} added`, infoType: 'info' })
        setTimeout(() => {
          this.setState({ info: null })
        }, 5000)
      }
      catch (exception) {
        this.setState({ info: 'Error creating a new blog', infoType: 'error' })
        setTimeout(() => {
          this.setState({ info: null })
        }, 5000)
      }
    }
  }

  render() {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification message={this.state.info} type={this.state.infoType} />
        <form onSubmit={this.logout}>
          <p>{this.props.user.name} logged in&nbsp;
        <button type="submit">logout</button>
          </p>
        </form>
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
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired
}

export default Blogs