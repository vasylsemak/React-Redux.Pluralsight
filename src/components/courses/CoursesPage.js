import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import CourseList from './CourseList'
import * as courseActions from '../../redux/actions/courseActions'

class CoursesPage extends React.Component {
  componentDidMount() {
    this.props.actions
      .loadCourses()
      .catch((err) => alert('Loading courses has failed! ' + err))
  }

  render() {
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
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  courses: state.courses,
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(courseActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)
