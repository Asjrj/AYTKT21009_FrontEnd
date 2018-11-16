import React from 'react'
import Login from './containers/Login'
import Blogs from './containers/Blogs'
import Blog from './containers/Blog'
import Users from './containers/Users'
import User from './containers/User'
import blogService from './services/blogs'
import userService from './services/users'
import { BrowserRouter as Router, Route } from 'react-router-dom'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      users: [],
      user: null
    }
  }

  async componentDidMount() {
    const blogs = await blogService.getAll()
    this.setState({ blogs })
    const users = await userService.getAll()
    this.setState({ users })
    const loggedUserJSON = window.localStorage.getItem('blogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
    }
  }

  login = (user) => {
    this.setState({ user: user })
    window.localStorage.setItem('blogUser', JSON.stringify(user))
  }

  addBlog = (newBlog) => {
    let newBlogs = this.state.blogs.slice(0)
    newBlogs.push(newBlog)
    this.setState({ blogs: newBlogs })
  }

  likeThisBlog = (likedBlog) => {
    let newBlogs = this.state.blogs.filter((element) => element.id !== likedBlog.id)
    newBlogs.push(likedBlog)
    this.setState({ blogs: newBlogs })
  }

  deleteThisBlog = (deleteBlog) => {
    let newBlogs = this.state.blogs.slice(0)
    this.setState({ blogs: newBlogs.filter(element => element.id !== deleteBlog.id) })
  }

  userById = (id) => {
    return this.state.users.find(a => a.id === id)
  }

  blogById = (id) => {
    return this.state.blogs.find(a => a.id === id)
  }

  render() {
    if (this.state.user === null) {
      return (
        <Login
          state={this.state}
          login={this.login}
        ></Login>
      )
    } else {
      return (
        <Router>
          <div>
            <Route exact path="/" render={() =>
              <Blogs
                user={this.state.user}
                blogs={this.state.blogs}
                addBlog={this.addBlog}
              ></Blogs>} />
            <Route exact path="/blogs/:id" render={({ match }) =>
              <Blog
                user={this.state.user}
                blog={this.blogById(match.params.id)}
                blogs={this.state.blogs}
                likeThisBlog={this.likeThisBlog}
                deleteThisBlog={this.deleteThisBlog}
              ></Blog>} />
            <Route exact path="/users" render={() =>
              <Users
                user={this.state.user}
                users={this.state.users}
              ></Users>} />
            <Route exact path="/users/:id" render={({ match }) =>
              <User user={this.state.user} theUser={this.userById(match.params.id)} blogs={this.state.blogs} />}
            />
          </div>
        </Router>
      )
    }
  }
}

export default App;
