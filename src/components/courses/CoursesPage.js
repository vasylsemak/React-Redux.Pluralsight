import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import * as courseActions from '../../redux/actions/courseActions'
import * as authorActions from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'
import CourseList from './CourseList'
import Spinner from '../common/Spinner'

class CoursesPage extends React.Component {
  state = { isRedirectOn: false }

  componentDidMount() {
    const { courses, authors, loadCourses, loadAuthors } = this.props

    if (courses.length === 0) {
      loadCourses().catch((err) => alert('Loading Courses has failed! ' + err))
    }
    if (authors.length === 0) {
      loadAuthors().catch((err) => alert('Loading Authors has failed! ' + err))
    }
  }

  render() {
    const { isRedirectOn } = this.state
    const { courses, authors } = this.props
    const coursesWithAuthor =
      courses.length === 0 || authors.length === 0
        ? []
        : addAuthorName(courses, authors)

    return isRedirectOn ? (
      <Redirect to='/course' />
    ) : (
      <>
        <Spinner />
        <h2>Courses</h2>
        <button
          style={{ marginBottom: 20 }}
          className='btn btn-primary add-course'
          onClick={() => this.setState({ isRedirectOn: true })}
        >
          Add Course
        </button>
        <CourseList courses={coursesWithAuthor} />
      </>
    )
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  courses: state.courses,
  authors: state.authors,
})

const mapDispatchToProps = (dispatch) => ({
  loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
  loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)

// utilitu f-n
function addAuthorName(courses, authors) {
  return courses.map((course) => {
    const authorName = authors.find((a) => a.id === course.authorId).name || 'L'
    return { ...course, authorName }
  })
}
