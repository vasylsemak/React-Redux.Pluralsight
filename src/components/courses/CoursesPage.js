import React from 'react'
import { connect } from 'react-redux'
// import * as courseActions from '../../redux/actions/courseActions'
// import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

class CoursesPage extends React.Component {
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
}

const mapStateToProps = (state) => ({ courses: state.courses })

export default connect(mapStateToProps)(CoursesPage)
