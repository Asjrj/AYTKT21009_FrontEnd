import React from 'react'
import Login from './containers/Login'
import Blogs from './containers/Blogs'
import Users from './containers/Users'
import blogService from './services/blogs'
import { BrowserRouter as Router, Route } from 'react-router-dom'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
                likeThisBlog={this.likeThisBlog}
                deleteThisBlog={this.deleteThisBlog}
              ></Blogs>} />
            <Route exact path="/users" render={() =>
              <Users
                user={this.state.user}
              ></Users>} />
          </div>
        </Router>
      )
    }
  }
}

export default App;
