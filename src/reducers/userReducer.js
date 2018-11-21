import userService from '../services/users'

const initialState = {
  users: [],
  user: null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALIZE': {
      return {
        users: action.data,
        user: null
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

export default userReducer