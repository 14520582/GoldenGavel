import { HOME_DATA_UPDATE } from '../actions/constants'

const initialState = {}

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case HOME_DATA_UPDATE:
      state = action.home
      return state
    default:
      return state
  }
}
