import React from 'react'
import CourseForm from './CourseForm'
import { shallow } from 'enzyme'

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
  return shallow(<CourseForm {...props} />)
}

it('renders form and header', () => {
  const wrapper = renderCourseForm()
  expect(wrapper.find('form').length).toBe(1)
  expect(wrapper.find('h2').text()).toEqual('Add Course')
})

it("labels save button 'Save' when not saving", () => {
  const wrapper = renderCourseForm()
  expect(wrapper.find('button').text()).toEqual('Save')
})
it('labels save button "Saving..." when saving', () => {
  const wrapper = renderCourseForm({ saving: true })
  expect(wrapper.find('button').text()).toEqual('Saving...')
})
