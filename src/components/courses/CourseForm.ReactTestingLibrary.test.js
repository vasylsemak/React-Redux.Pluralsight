import React from 'react'
import CourseForm from './CourseForm'
import { render } from '@testing-library/react'

// helper f-n for default form
function renderCourseForm(args) {
  const defaultProps = {
    course: {},
    authors: [],
    onSave: () => {},
    onChange: () => {},
    saving: false,
    errors: {},
  }
  const props = { ...defaultProps, ...args }
  // shallow renders single component without children
  return render(<CourseForm {...props} />)
}

it('should render "Add Course" header', () => {
  const { getByText } = renderCourseForm()
  getByText('Add Course')
})

it("labels save button 'Save' when NOT saving", () => {
  const { getByText } = renderCourseForm()
  getByText('Save')
})

it("labels save button 'Saving...' when saving", () => {
  const { getByText } = renderCourseForm({ saving: true })
  getByText('Saving...')
})
