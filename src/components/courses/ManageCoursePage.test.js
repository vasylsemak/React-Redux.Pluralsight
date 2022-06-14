import React from 'react'
import { mount } from 'enzyme'
import { courses, authors, newCourse } from '../../../tools/mockData'
import { ManageCoursePage } from './ManageCoursePage'

function render(args) {
  const defaultProps = {
    courses,
    authors,
    course: newCourse,
    loadCourses: jest.fn(),
    loadAuthors: jest.fn(),
    saveCourse: jest.fn(),
    history: {}, // props from Redux
    mathc: {},
  }
  const props = { ...defaultProps, ...args }

  return mount(<ManageCoursePage {...props} />)
}

it('sets an error when attempting to save an empty title field', () => {
  const wrapper = render()
  wrapper.find('form').simulate('submit')
  const error = wrapper.find('.alert').first()

  expect(error.text()).toBe('Title is required!')
})
