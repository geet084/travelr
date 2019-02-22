import React from 'react'
import { Link } from 'react-router-dom'

export const NavBtn = ({ name, path }) => {
  return (
    <li>
      <Link to={path}>
        {name}
      </Link>
    </li>
  )
}

export default NavBtn;