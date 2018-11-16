import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <div className='blogDetail'>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link><br />
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog