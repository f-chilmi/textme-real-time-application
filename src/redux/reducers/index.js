import {combineReducers} from 'redux'

import auth from './auth'
import chat from './chat'
import users from './users'

export default combineReducers({
  auth,
  chat,
  users,
})