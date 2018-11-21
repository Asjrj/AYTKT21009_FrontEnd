const initialState = {
  message: '',
  type: 'info'
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return {
        message: action.data.message,
        type: action.data.type
      }
    case 'CLEAR':
      return {
        message: '',
        type: 'info'
      }
    default:
      return state
  }
}

export const notify = (message, messageType, sec) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFY',
      data: {
        message: message,
        type: messageType
      }
    })
    await setTimeout(() => {
      dispatch({
        type: 'CLEAR',
        data: {
          message: '',
          type: 'info'
        }
      })
    }, sec * 1000)
  }
}

export default notificationReducer