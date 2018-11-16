import React from 'react'

class User extends React.Component {

  logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('blogUser')
    window.location.reload()
  }

  getTheBlogs = () => {
    let theBlogs = []
    this.props.blogs.forEach(element => {
      if(element.user && element.user._id === this.props.theUser.id){
        theBlogs.push(element)
      }
    });
    return(theBlogs)
  }

  render() {
    return (
      <div>
        <h2>Blogs</h2>
        <form onSubmit={this.logout}>
          <p>{this.props.user.name} logged in&nbsp; <button type="submit">logout</button>
          </p>
        </form>
        <h2>{this.props.theUser.name}</h2>
        <h3>Added blogs</h3>
        <ul>
        {this.getTheBlogs().map(blog => <li key={blog.id}>{blog.title} by {blog.author}</li>)}
        </ul>
      </div>
    )
  }
}

export default User
