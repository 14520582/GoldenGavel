import { combineReducers } from 'redux'
import infouser from './infouser'
import home from './home'
import search from './search'
const rootReducer = combineReducers ({
  infouser,
  search,
  home,
})
export default rootReducer
