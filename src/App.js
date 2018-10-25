import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      blogs: [],
      user: null
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
      this.setState({
        error: 'Invalid username or password',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('blogUser')
    window.location.reload()
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value })
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }


  render() {
    if (this.state.user === null) {
      return (
        <div>
          <h2>Log in to application</h2>
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
          <form onSubmit={this.logout}>
            <p>{this.state.user.name} logged in&nbsp;
            <button type="submit">logout</button>
            </p>
          </form>
          {this.state.blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      );
    }
  }
}

export default App;
