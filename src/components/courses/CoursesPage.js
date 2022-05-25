import React from 'react'
import { connect } from 'react-redux'
import { createCourse } from '../../redux/actions/courseActions'
import PropTypes from 'prop-types'

class CoursesPage extends React.Component {
  state = {
    course: {
      title: '',
    },
  }

  handleChange = (e) => {
    const course = { ...this.state.course, title: e.target.value }
    this.setState({ course })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.dispatch(createCourse(this.state.course))
    this.setState({ course: { title: '' } })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type='text'
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <input type='submit' value='Save' />
      </form>
    )
  }
}

CoursesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return { courses: state.courses }
}

export default connect(mapStateToProps)(CoursesPage)
