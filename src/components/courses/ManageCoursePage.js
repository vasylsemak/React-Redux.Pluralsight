import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as courseActions from '../../redux/actions/courseActions'
import * as authorActions from '../../redux/actions/authorActions'
import { newCourse } from '../../../tools/mockData'
import CourseForm from './CourseForm'
import Spinner from '../common/Spinner'
import { toast } from 'react-toastify'

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
  const [saving, setSaving] = useState(false)

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

  // handle typing in CourseForm field
  function handleChange(evt) {
    const { name, value } = evt.target
    setCourse((prevState) => ({
      ...prevState,
      [name]: name === 'authorId' ? parseInt(value, 10) : value,
    }))
  }

  // handle saving form to db/API
  function handleSave(evt) {
    evt.preventDefault()
    setSaving(true)
    saveCourse(course)
      .then(() => {
        setCourse(newCourse)
        toast.success('Course saved!')
        history.push('/courses')
      })
      .catch((error) => {
        setSaving(false)
        setErrors({ onSave: error.message })
      })
  }

  return courses.length === 0 || authors.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      authors={authors}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  )
}

const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params
  const { courses } = state
  const course =
    slug && courses.length > 0 ? findCourseBySlug(courses, slug) : newCourse

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

// utilitu f-n
function findCourseBySlug(courses, slug) {
  return courses.find((c) => c.slug === slug) || null
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage)
