import React from 'react'
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'

const BlogForm = (props) => (
  <form onSubmit={props.handleCreate}>
    <FormGroup>
      <div>
        <ControlLabel>title:</ControlLabel>
        <FormControl type="text" value={props.tila.newTitle} onChange={props.handleTitleChange} />
      </div>
      <div>
        <ControlLabel>author:</ControlLabel>
        <FormControl type="text" value={props.tila.newAuthor} onChange={props.handleAuthorChange} />
      </div>
      <div>
        <ControlLabel>url:</ControlLabel>
        <FormControl type="text" value={props.tila.newUrl} onChange={props.handleUrlChange} />
      </div>
      <br />
      <Button type="submit" bsStyle="primary" block>create</Button>
    </FormGroup>
  </form>
)

export default BlogForm