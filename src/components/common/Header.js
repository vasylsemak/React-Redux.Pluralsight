import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  const active = { color: 'orange' }

  return (
    <nav>
      <NavLink exact to='/' className='navlink' activeStyle={active}>
        Home
      </NavLink>
      {' | '}
      <NavLink to='/courses' className='navlink' activeStyle={active}>
        Courses
      </NavLink>
      {' | '}
      <NavLink to='/about' className='navlink' activeStyle={active}>
        About
      </NavLink>
    </nav>
  )
}

export default Header
