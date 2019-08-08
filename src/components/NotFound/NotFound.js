import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className='not-found'>
      <h3>404 NOT FOUND</h3>
      <Link to='/'>HOME</Link>
    </div>
  )
}

export default NotFound;