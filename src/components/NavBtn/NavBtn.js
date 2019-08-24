import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';

export const NavBtn = ({ name, path }) => {
  
  return (
    <li>
      <NavLink
        to={path.toLowerCase()}
        exact={true}
        activeClassName="active"
      >
        {name}
      </NavLink>
    </li>
  )
}

NavBtn.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
}

NavBtn.defaultProps = {
  name: '',
  path: '',
}

export default NavBtn;