import * as types from './actionTypes'
import * as courseApi from '../../api/courseApi'

export const createCourse = (course) => ({
  type: types.CREATE_COURSE,
  course,
})

const loadCoursesSuccess = (courses) => ({
  type: types.LOAD_COURSES_SUCCESS,
  courses,
})

// F-n uses thunk
export const loadCourses = () => (dispatch) =>
  courseApi
    .getCourses()
    .then((courses) => {
      dispatch(loadCoursesSuccess(courses))
    })
    .catch((err) => {
      throw err
    })
