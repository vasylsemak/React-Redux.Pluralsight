import { combineReducers } from 'redux'
import courseReducer from './courseReducer'
import authorReducer from './authorReducer'
import apiCallsInProgress from './apiCallStatusReducer'

const rootReducer = combineReducers({
  courses: courseReducer,
  authors: authorReducer,
  apiCallsInProgress,
})

export default rootReducer
