import React from 'react'
import blogService from '../services/blogs'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import Notification from '../components/Notification'
import Togglable from '../components/Togglable'

class Blogs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newTitle: '',
      newAuthor: '',
      newUrl: '',
      info: null,
      infoType: 'info',
      showBlogDetails: ''
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

  setBlogDetailVisibility = (event) => {
    event.preventDefault()
    if (this.state.showBlogDetails === event.target.getAttribute("id")) {
      this.setState({ showBlogDetails: '' })
    }
    else {
      this.setState({ showBlogDetails: event.target.getAttribute("id") })
    }
  }

  likeThisBlog = async (event) => {
    event.preventDefault()
    let likedBlog = this.props.blogs.find((element) => {
      return element.id === event.target.getAttribute("id")
    })
    const updateBlog = {
      id: likedBlog.id,
      title: likedBlog.title,
      author: likedBlog.author,
      url: likedBlog.url,
      likes: likedBlog.likes++,
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
              showBlogDetails={this.state.showBlogDetails}
              setBlogVisibility={this.setBlogDetailVisibility}
              likeThisBlog={this.likeThisBlog}
              deleteThisBlog={this.deleteThisBlog}
              currentUser={this.props.user} />
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

export default Blogs