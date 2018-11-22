import blogService from '../services/blogs'

const initialState = {
  blogs: []
}

const blogReducer = (state = initialState, action) => {
  console.log('***BLOG REDUCER ACTION:', action)
  switch (action.type) {
    case 'INITIALIZE_BLOGS': {
      return {
        blogs: action.data
      }
    }
    case 'ADD_BLOG': {
      let newBlogs = state.blogs.slice(0)
      newBlogs.push(action.data)
      return {
        blogs: newBlogs
      }
    }
    case 'DELETE_BLOG': {
      return {
        blogs: state.blogs.filter(element => element.id !== action.data.id)
      }
    }
    case 'LIKE_BLOG': {
      let newBlogs = state.blogs.filter((element) => element.id !== action.data.id)
      newBlogs.push(action.data)
      return {
        blogs: newBlogs
      }
    }
    case 'COMMENT_BLOG': {
      let newBlogs = state.blogs.filter((element) => element.id !== action.data.id)
      newBlogs.push(action.data)
      return {
        blogs: newBlogs
      }
    }
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE_BLOGS',
      data: blogs
    })
  }
}
export const addBlog = (blog, token) => {
  return async (dispatch) => {
    const newBlog = await blogService.addBlog(blog, token)
    newBlog.id = newBlog._id
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog
    })
  }
}
export const deleteBlog = (blog, token) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog.id, token)
    dispatch({
      type: 'DELETE_BLOG',
      data: blog
    })
  }
}
export const likeBlog = (blog, token) => {
  return async (dispatch) => {
    await blogService.likeBlog(blog, token)
    dispatch({
      type: 'LIKE_BLOG',
      data: blog
    })
  }
}
export const commentBlog = (blog, comment) => {
  return async (dispatch) => {
    const commentedBlog = await blogService.commentBlog(blog.id, comment)
    commentedBlog.id = commentedBlog._id
    commentedBlog.user = blog.user
    dispatch({
      type: 'COMMENT_BLOG',
      data: commentedBlog
    })
  }
}

export default blogReducer