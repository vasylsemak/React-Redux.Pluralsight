import * as types from './actionTypes'
import * as courseApi from '../../api/courseApi'
import { beginApiCall } from './apiStatusActions'

const loadCoursesSuccess = (courses) => ({
  type: types.LOAD_COURSES_SUCCESS,
  courses,
})

const createCourseSuccess = (course) => ({
  type: types.CREATE_COURSE_SUCCESS,
  course,
})

const updateCourseSuccess = (course) => ({
  type: types.UPDATE_COURSE_SUCCESS,
  course,
})

export const loadCourses = () => (dispatch) => {
  // add 1 to apiCallsInProgress state prop
  dispatch(beginApiCall())
  // fetch courses from API asyncronoulsy
  courseApi
    .getCourses()
    .then((courses) => {
      dispatch(loadCoursesSuccess(courses))
    })
    .catch((err) => {
      throw err
    })
}

export const saveCourse = (course) => (dispatch) => {
  // add 1 to apiCallsInProgress state prop
  dispatch(beginApiCall())
  // API async call to edit or add course
  courseApi
    .saveCourse(course)
    .then((savedCourse) => {
      course.id
        ? dispatch(updateCourseSuccess(savedCourse))
        : dispatch(createCourseSuccess(savedCourse))
    })
    .catch((err) => {
      throw err
    })
}
