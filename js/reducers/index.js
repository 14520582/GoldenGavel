import { combineReducers } from 'redux'
import infouser from './infouser'
import home from './home'
import notification from './notification'
import search from './search'
const rootReducer = combineReducers ({
  infouser,
  search,
  home,
  notification
})
export default rootReducer
