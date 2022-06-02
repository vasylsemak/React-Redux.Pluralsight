import * as types from './actionTypes'
import * as courseApi from '../../api/courseApi'

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

// handling async operations
export const loadCourses = () => (dispatch) =>
  courseApi
    .getCourses()
    .then((courses) => {
      dispatch(loadCoursesSuccess(courses))
    })
    .catch((err) => {
      throw err
    })

export const saveCourse = (course) => (dispatch) =>
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
