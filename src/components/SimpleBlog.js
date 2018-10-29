import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className="BlogLine">
      {blog.title} {blog.author}
    </div>
    <div id='likesDiv'>
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog