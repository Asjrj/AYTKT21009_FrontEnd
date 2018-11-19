const initialState = {
  notification: '',
  notificationType: 'info'
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return {
        notification: action.data.notification,
        notificationType: action.data.notificationType
      }
    case 'CLEAR':
      return {
        notification: '',
        notificationType: 'info'
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
        notification: message,
        notificationType: messageType
      }
    })
    await setTimeout(() => {
      dispatch({
        type: 'CLEAR',
        data: {
          notification: '',
          notificationType: 'info'
        }
      })
    }, sec * 1000)
  }
}

export default notificationReducer