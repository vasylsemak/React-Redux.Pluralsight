import * as types from './actionTypes'
import { getAuthors } from '../../api/authorApi'

const loadAuthorsSuccess = (authors) => ({
  type: types.LOAD_AUTHORS_SUCCESS,
  authors,
})

export const loadAuthors = () => (dispatch) =>
  getAuthors()
    .then((authors) => dispatch(loadAuthorsSuccess(authors)))
    .catch((err) => {
      throw err
    })
