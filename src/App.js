import React from 'react'
import { connect } from 'react-redux'
import Login from './containers/Login'
import Logout from './containers/Logout'
import Blogs from './containers/Blogs'
import Blog from './containers/Blog'
import Users from './containers/Users'
import User from './containers/User'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { BrowserRouter as Router, Route } from 'react-router-dom'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }

  async componentDidMount() {
    await this.props.initializeBlogs()
    await this.props.initializeUsers()
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

  render() {
    if (this.state.user === null) {
      return (
        <Login state={this.state} login={this.login} />
      )
    } else {
      return (
        <Router>
          <div>
            <Logout user={this.state.user} />
            <Route exact path="/" render={() =>
              <Blogs user={this.state.user} />}
            />
            <Route exact path="/blogs/:id" render={({ match }) =>
              <Blog blogId={match.params.id} user={this.state.user} ></Blog>}
            />
            <Route exact path="/users" render={() => <Users />} />
            <Route exact path="/users/:id" render={({ match }) =>
              <User theUserId={match.params.id} blogs={this.state.blogs} />}
            />
          </div>
        </Router>
      )
    }
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  initializeUsers
}
export default connect(null, mapDispatchToProps)(App)
