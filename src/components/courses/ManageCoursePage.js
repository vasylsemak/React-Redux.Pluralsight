import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as courseActions from '../../redux/actions/courseActions'
import * as authorActions from '../../redux/actions/authorActions'

function ManageCoursePage({ courses, authors, loadCourses, loadAuthors }) {
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((err) => alert('Loading Courses has failed! ' + err))
    }
    if (authors.length === 0) {
      loadAuthors().catch((err) => alert('Loading Authors has failed! ' + err))
    }
  }, [])

  return (
    <>
      <h2>Manage Course</h2>
    </>
  )
}

ManageCoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  courses: state.courses,
  authors: state.authors,
})

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage)
