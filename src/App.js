import React from 'react'
import { connect } from 'react-redux'
import Login from './containers/Login'
import Logout from './containers/Logout'
import Blogs from './containers/Blogs'
import Blog from './containers/Blog'
import Users from './containers/Users'
import User from './containers/User'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers, setUser } from './reducers/userReducer'
import { BrowserRouter as Router, Route } from 'react-router-dom'


class App extends React.Component {

  async componentDidMount() {
    await this.props.initializeBlogs()
    await this.props.initializeUsers()
    const loggedUserJSON = window.localStorage.getItem('blogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.props.setUser(user)
    }
  }

  render() {
    if (this.props.theUser === null) {
      return (
        <Login state={this.state} login={this.login} />
      )
    } else {
      return (
        <Router>
          <div>
            <Logout />
            <Route exact path="/" render={() => <Blogs />} />
            <Route exact path="/blogs/:id" render={({ match }) =>
              <Blog blogId={match.params.id} ></Blog>}
            />
            <Route exact path="/users" render={() => <Users />} />
            <Route exact path="/users/:id" render={({ match }) =>
              <User theUserId={match.params.id} />}
            />
          </div>
        </Router>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    theUser: state.users.user
  }
}
const mapDispatchToProps = {
  initializeBlogs,
  initializeUsers,
  setUser
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
