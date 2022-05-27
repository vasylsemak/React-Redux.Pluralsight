import React from 'react'
import { connect } from 'react-redux'
import * as courseActions from '../../redux/actions/courseActions'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'

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
        {this.props.courses.map((c) => (
          <div key={c.title}>{c.title}</div>
        ))}
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
