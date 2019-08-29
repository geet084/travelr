import React from 'react';
import Collapsible from 'react-collapsible';
import Counter from '../Counter/Counter';

const propsTime = {
  timeInSeconds: 1000000,
  earthSpin: 280000,
  earthOrbit: 18500000,
  solarSystemOrbit: 124450000,
  galaxyMovement: 70000000,
  totalMovement: 213230000,
}

export const Distances = (props) => {
  const counters = Object.keys(props).map((key, i) => (
    <p key={key}>
      <Counter start={props[key]} end={props[key] + propsTime[key]} decimal={i < 2 ? 1 : 0} />
    </p>
  ))

  return (
    <Collapsible trigger='Show More'>
      <div className='stats text-bg'>
        <h4>HOW FAST YOU ARE MOVING RIGHT NOW</h4>
        <h6>distance from new york to san francisco: <span>2,569 miles</span></h6>
        <h6>distance from san francisco to paris: <span>5,560 miles</span> </h6>
        <h6>distance from new york to australia: <span>10,512 miles</span></h6>
        <h6>circumference of the earth: <span>24,901 miles</span></h6>
        <h6>distance to the moon: <span>238,900 miles</span></h6>
      </div>
      <section className="details">
        <div className="title text-bg">
          <p>elapsed time since you arrived on this page in seconds</p>
          <p>Distance covered in miles due to Earth spinning</p>
          <p>Distance covered in miles due to the Earth orbiting the Sun</p>
          <p>Distance covered in miles due to the Solar system orbiting in the galaxy</p>
          <p>Distance covered in miles due to the Milky Way moving towards Andromeda</p>
          <p>Your total distance covered in that time</p>
        </div>
        <div className="counter-info text-bg">
          {counters}
        </div>
      </section>
    </Collapsible>
  )
}

export default Distances;