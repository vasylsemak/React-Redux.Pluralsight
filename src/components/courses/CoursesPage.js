import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import CourseList from './CourseList'
import * as courseActions from '../../redux/actions/courseActions'
import * as authorActions from '../../redux/actions/authorActions'

class CoursesPage extends React.Component {
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
    const { courses, authors } = this.props
    console.log('courses: ', courses)
    console.log('authors: ', authors)

    return (
      <>
        <h2>Courses</h2>
        <CourseList courses={this.props.courses} />
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
