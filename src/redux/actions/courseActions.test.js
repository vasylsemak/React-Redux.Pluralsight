import * as courseActions from './courseActions'
import * as actionTypes from './actionTypes'
import { courses } from '../../../tools/mockData'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import configureMockStore from 'redux-mock-store'

// test an async action
const middleware = [thunk]
const mockStore = configureMockStore(middleware)

describe('Async Actions', () => {
  afterEach(() => {
    // to mock fetch call after each thunk
    fetchMock.restore()
  })

  describe('Load Courses Thunk', () => {
    it('should create BE', () => {
      fetchMock.mock('*', {
        // api call responce mock
        // capture any fetch calls, return body with array of courses
        // with a header set to application/json
        body: courses,
        headers: { 'content-type': 'application/json' },
      })
    })
  })
})

describe('createCourseSuccess', () => {
  it('should create a CREATE_COURSE_SUCCESS action', () => {
    // arrange
    const course = courses[0]
    const expectedAction = {
      type: actionTypes.CREATE_COURSE_SUCCESS,
      course,
    }
    // act
    const action = courseActions.createCourseSuccess(course)
    // assert
    expect(action).toEqual(expectedAction)
  })
})
