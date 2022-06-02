import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as courseActions from '../../redux/actions/courseActions'
import * as authorActions from '../../redux/actions/authorActions'
import { newCourse } from '../../../tools/mockData'
import CourseForm from './CourseForm'

function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((err) => alert('Loading Courses has failed! ' + err))
    } else {
      setCourse({ ...props.course })
    }
    if (authors.length === 0) {
      loadAuthors().catch((err) => alert('Loading Authors has failed! ' + err))
    }
  }, [props.course])

  function handleChange(evt) {
    const { name, value } = evt.target
    setCourse((prevState) => ({
      ...prevState,
      [name]: name === 'authorId' ? parseInt(value, 10) : value,
    }))
  }

  function handleSave(evt) {
    evt.preventDefault()
    saveCourse(course)
      .then(() => setCourse(newCourse))
      .then(() => history.push('/courses'))
  }

  return (
    <CourseForm
      course={course}
      authors={authors}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
    />
  )
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params
  const course =
    slug && state.courses.length > 0
      ? findCourseBySlug(state.courses, slug)
      : newCourse

  return {
    course,
    courses: state.courses,
    authors: state.authors,
  }
}

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
  saveCourse: courseActions.saveCourse,
}

function findCourseBySlug(courses, slug) {
  return courses.find((c) => c.slug === slug) || null
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage)
