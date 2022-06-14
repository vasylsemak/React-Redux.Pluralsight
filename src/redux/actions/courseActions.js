import * as types from './actionTypes'
import * as courseApi from '../../api/courseApi'
import { beginApiCall, apiCallError } from './apiStatusActions'

const loadCoursesSuccess = (courses) => ({
  type: types.LOAD_COURSES_SUCCESS,
  courses,
})
export const createCourseSuccess = (course) => ({
  type: types.CREATE_COURSE_SUCCESS,
  course,
})
const updateCourseSuccess = (course) => ({
  type: types.UPDATE_COURSE_SUCCESS,
  course,
})
const deleteCourseOptimistic = (course) => ({
  type: types.DELETE_COURSE_OPTIMISTIC,
  course,
})

export const loadCourses = () => (dispatch) => {
  // add 1 to apiCallsInProgress state prop
  dispatch(beginApiCall())
  // fetch courses from API asyncronoulsy
  return courseApi
    .getCourses()
    .then((courses) => {
      dispatch(loadCoursesSuccess(courses))
    })
    .catch((err) => {
      dispatch(apiCallError(err))
      throw err
    })
}

export const saveCourse = (course) => (dispatch) => {
  // add 1 to apiCallsInProgress state prop
  dispatch(beginApiCall())
  // API async call to edit or add course
  return courseApi
    .saveCourse(course)
    .then((savedCourse) => {
      course.id
        ? dispatch(updateCourseSuccess(savedCourse))
        : dispatch(createCourseSuccess(savedCourse))
    })
    .catch((err) => {
      dispatch(apiCallError(err))
      throw err
    })
}

export const deleteCourse = (course) => (dispatch) => {
  // optimistic delete - not dispatching api calls and errors
  dispatch(deleteCourseOptimistic(course))
  return courseApi.deleteCourse(course.id)
}
