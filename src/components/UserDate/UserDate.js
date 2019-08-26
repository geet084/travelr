import React from 'react';

export const UserDate = ({ userDate, days, hours, num }) => {
  return (
    <div className="user-date">
      <p>Time elapsed since {userDate}: </p>
      <p className="user-info">
        <span>{days} days and </span>
        <span> ~{hours} hours</span>
      </p>
      <p>Approx. total miles you've gone in that time: </p>
      <p className="user-info">{num}</p>
    </div>
  )
}
export default UserDate;