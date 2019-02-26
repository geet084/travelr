import React from 'react'
import { NavLink } from 'react-router-dom'

export const NavBtn = ({ name, path }) => {
  return (
    <li>
      <NavLink to={path.toLowerCase()} exact={true}>
        {name}
      </NavLink>
    </li>
  )
}

export default NavBtn;