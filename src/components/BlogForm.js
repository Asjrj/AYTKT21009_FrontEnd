import React from 'react'
const BlogForm = (props) => (
  <form onSubmit={props.handleCreate}>
    <div>
      title:
      <input type="text" value={props.tila.newTitle} onChange={props.handleTitleChange} />
    </div>
    <div>
      author:
      <input type="text" value={props.tila.newAuthor} onChange={props.handleAuthorChange} />
    </div>
    <div>
      url:
      <input type="text" value={props.tila.newUrl} onChange={props.handleUrlChange} />
    </div>
    <button type="submit">create</button>
  </form>
)

export default BlogForm