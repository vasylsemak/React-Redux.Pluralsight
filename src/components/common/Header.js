import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  const active = { color: 'orange' }

  return (
    <nav>
      <NavLink exact to='/' activeStyle={active}>
        Home
      </NavLink>
      {' | '}
      <NavLink to='/about' activeStyle={active}>
        About
      </NavLink>
    </nav>
  )
}

export default Header
