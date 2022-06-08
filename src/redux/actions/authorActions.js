import * as types from './actionTypes'
import { getAuthors } from '../../api/authorApi'
import { beginApiCall } from './apiStatusActions'

const loadAuthorsSuccess = (authors) => ({
  type: types.LOAD_AUTHORS_SUCCESS,
  authors,
})

export const loadAuthors = () => (dispatch) => {
  // add 1 to apiCallsInProgress state prop
  dispatch(beginApiCall())
  // fetch authors from API asyncronoulsy
  return getAuthors()
    .then((authors) => dispatch(loadAuthorsSuccess(authors)))
    .catch((err) => {
      throw err
    })
}
