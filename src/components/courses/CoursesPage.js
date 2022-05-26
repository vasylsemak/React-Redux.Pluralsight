import React from 'react'
import { connect } from 'react-redux'
import * as courseActions from '../../redux/actions/courseActions'
import { bindActionCreators } from 'redux'
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
    this.props.actions.createCourse(this.state.course)
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
        {this.props.courses.map((c) => (
          <div key={c.title}>{c.title}</div>
        ))}
      </form>
    )
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({ courses: state.courses })

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(courseActions, dispatch),
})

// const mapDispatchToProps = (dispatch) => ({
//   actions: (course) => dispatch(courseActions(course)),
// })

// const mapDispatchToProps = (dispatch) => ({
//   actions: bindActionCreators(courseActions, dispatch),
// })

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)
