// @flow
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


export class App extends React.Component {

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
        <div className="container">
          <Login />
        </div>
      )
    } else {
      return (
        <Router>
          <div className="container">
            <Logout />
            <Route exact path="/" render={() => <Blogs />} />
            <Route exact path="/blogs/:id" render={({ match, history }) =>
              <Blog blogId={match.params.id} history={history}></Blog>}
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
