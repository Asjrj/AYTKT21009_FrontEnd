import React from 'react'

const Blog = ({ blog, showBlogDetails, setBlogVisibility, likeThisBlog }) => {
  if (showBlogDetails === blog.id) {
    let userName = null
    if (blog.user) {
      userName = blog.user.name
    }
    let showUser = { display: userName ? '' : 'none' }
    return (
      <div className='blogDetail'>
        <a onClick={setBlogVisibility}>{blog.title} {blog.author}</a><br />
        <a href={blog.url}>{blog.url}</a><br />
        <a>{blog.likes} likes <button id={blog.id} onClick={likeThisBlog}>like</button></a><br />
        <a style={showUser}>added by {userName}</a>
      </div>
    )
  }
  else {
    return (
      <div className='blogDetail'>
        <a id={blog.id} onClick={setBlogVisibility}>{blog.title} {blog.author}</a>
      </div>
    )
  }
}

export default Blog