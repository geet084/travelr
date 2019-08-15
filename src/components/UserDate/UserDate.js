import React from 'react';

export const UserDate = ({ days, hours, num}) => {
  return (
    <div>
      <p className="test">Time elapsed since {this.state.userDate}: </p>
      <p className="test">
        <span>{days} days and </span>
        <span> ~{hours} hours</span>
      </p>
      <p className="test">Approx. total miles you've gone in that time: </p>
      <p className="test user-dist">{num}</p>
    </div>
  )
}
export default UserDate;