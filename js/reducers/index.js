import { combineReducers } from 'redux'
import infouser from './infouser'
import home from './home'
const rootReducer = combineReducers ({
  infouser,
  home,
})
export default rootReducer
