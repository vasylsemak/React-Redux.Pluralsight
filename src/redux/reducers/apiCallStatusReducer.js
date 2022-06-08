import * as types from '../actions/actionTypes'
import initialState from './initialState'
const { apiCallsInProgress } = initialState

function actionTypeEndsSuccess(type) {
  return type.substring(type.length - 8) === '_SUCCESS'
}

export default function (state = apiCallsInProgress, action) {
  if (action.type === types.BEGIN_API_CALL) {
    return state + 1
  } else if (actionTypeEndsSuccess(action.type)) {
    return state - 1
  }
  return state
}
