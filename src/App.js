import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      blogs: [],
      user: null,
      newTitle: '',
      newAuthor: '',
      newUrl: '',
      info: null,
      infoType: 'info',
      showBlogDetails: ''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('blogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      this.setState({ username: '', password: '', user })
      window.localStorage.setItem('blogUser', JSON.stringify(user))
    } catch (exception) {
      this.setState({ info: 'Invalid username or password', infoType: 'error' })
      setTimeout(() => {
        this.setState({ info: null })
      }, 5000)
    }
  }

  logout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('blogUser')
    window.location.reload()
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
        let data = await blogService.addBlog(newBlog, this.state.user.token)
        data.id = data._id
        let blogs = this.state.blogs
        blogs.push(data)
        this.setState({ blogs: blogs })
        this.setState({ newTitle: '' })
        this.setState({ newAuthor: '' })
        this.setState({ newUrl: '' })
        this.blogForm.toggleVisibility()
        this.setState({ info: `a new blog ${data.title} by ${data.author} added`, infoType: 'info' })
        setTimeout(() => {
          this.setState({ info: null })
        }, 5000)
      } catch (exception) {
        this.setState({ info: 'Error creating a new blog', infoType: 'error' })
        setTimeout(() => {
          this.setState({ info: null })
        }, 5000)
      }
    }
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value })
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  setBlogDetailVisibility = (event) => {
    event.preventDefault()
    this.setState({ showBlogDetails: event.target.getAttribute("id") })
  }

  likeThisBlog = (event) => {
    event.preventDefault()
    let likedBlog = this.state.blogs.find((element) => {
      return element.id === event.target.getAttribute("id")
    })
    const updateBlog = {
      id: likedBlog.id,
      title: likedBlog.title,
      author: likedBlog.author,
      url: likedBlog.url,
      likes: likedBlog.likes + 1,
      user: likedBlog.user ? likedBlog.user._id : null
    }
    likedBlog.likes = likedBlog.likes + 1
    this.setState({ blogs: this.state.blogs })
    blogService.likeBlog(updateBlog, this.state.user.token)
  }

  deleteThisBlog = (event) => {
    event.preventDefault()
    let delId = event.target.getAttribute("id")
    let deleteBlog = this.state.blogs.find((element) => {
      return element.id === delId
    })
    if (window.confirm(`delete ${deleteBlog.title} by ${deleteBlog.author}`)) {
      blogService.deleteBlog(delId, this.state.user.token)
      this.setState({ blogs: this.state.blogs.filter(element => element.id !== delId) })
    }
  }


  render() {
    if (this.state.user === null) {
      return (
        <div>
          <h2>Log in to application</h2>
          <Notification message={this.state.info} type={this.state.infoType} />
          <form onSubmit={this.login}>
            <div>
              username:
            <input
                type="text"
                value={this.state.username}
                onChange={this.handleUsernameChange}
              />
            </div>
            <div>
              password:
            <input
                type="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      )
    } else {
      return (
        <div>
          <h2>Blogs</h2>
          <Notification message={this.state.info} type={this.state.infoType} />
          <form onSubmit={this.logout}>
            <p>{this.state.user.name} logged in&nbsp;
            <button type="submit">logout</button>
            </p>
          </form>
          {this.state.blogs
            .sort((a, b) => a.likes > b.likes ? -1 : (a.likes < b.likes ? 1 : 0))
            .map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                showBlogDetails={this.state.showBlogDetails}
                setBlogVisibility={this.setBlogDetailVisibility}
                likeThisBlog={this.likeThisBlog}
                deleteThisBlog={this.deleteThisBlog} />
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
      );
    }
  }
}

export default App;
