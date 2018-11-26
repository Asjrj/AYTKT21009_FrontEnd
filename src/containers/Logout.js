import React from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class Logout extends React.Component {

  logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('blogUser')
    window.location.replace('/')
  }

  render() {
    return (
      <div>
        <h2>Blogs</h2>
        <Navbar fluid>
          <Nav>
            <LinkContainer to='/'>
              <NavItem >Blogs</NavItem>
            </LinkContainer>
            <LinkContainer to='/users'>
              <NavItem >Users</NavItem>
            </LinkContainer>
            <NavItem >{this.props.theUser.name} logged in</NavItem>
            <NavItem >
              <Navbar.Form>
                <Button onClick={this.logout} bsSize='xsmall'>logout</Button>
              </Navbar.Form>
            </NavItem>
          </Nav>
        </Navbar>
      </div >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    theUser: state.users.user
  }
}
export default connect(mapStateToProps)(Logout)
