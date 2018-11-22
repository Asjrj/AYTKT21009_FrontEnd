import userService from '../services/users'

const initialState = {
  users: [],
  user: null
}

const userReducer = (state = initialState, action) => {
  console.log('*** USER REDUCER:', action)
  switch (action.type) {
    case 'INITIALIZE': {
      return {
        users: action.data,
        user: null
      }
    }
    case 'ADD_BLOG': {
      let userId = action.data.user._id
      let user = state.users.find((element) => element.id === userId)
      let newUsers = state.users.filter((element) => element.id !== userId)
      let newBlog = {_id: userId, title: action.data.title, author: action.data.author, likes: action.data.likes}
      user.blogs.push(newBlog)
      newUsers.push(user)
      return {
        users: newUsers,
        user: state.user
      }
    }
    case 'SET_USER': {
      return {
        users: state.users,
        user: action.data
      }
    }
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: users
    })
  }
}
export const setUser = (user) => {
  return async (dispatch) => {
    window.localStorage.setItem('blogUser', JSON.stringify(user))
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}


export default userReducer