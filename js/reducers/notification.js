import { NUMBER_MESSAGE_UPDATE, NUMBER_NOTIFICATION_UPDATE} from '../actions/constants'

const initialState = {notification: 0, message: 0}

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case NUMBER_NOTIFICATION_UPDATE:
      return {
        ...state,
        notification: action.notification
      }
    case NUMBER_MESSAGE_UPDATE:
      return {
        ...state,
        message: action.message
      }
    default:
      return state
  }
}
