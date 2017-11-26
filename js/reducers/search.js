import { SEARCH_ADD,  SEARCH_DELETE, SEARCH_CLEAR_ALL} from '../actions/constants'

const initialState = []

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ADD:
    return [
      action.search,
      ...state
    ]
    case SEARCH_DELETE:
      return state.filter(item => item !== action.search)
    case SEARCH_CLEAR_ALL:
      state = []
      return state
    default:
      return state
  }
}
