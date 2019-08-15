import React from 'react';
import Collapsible from 'react-collapsible';

export const Distances = () => {
  const { counter, timeInSeconds, earthSpin, earthOrbit, solarSystemOrbit, galaxyMovement, totalMovement } = this.props;
  return (
    <Collapsible className="test extra" trigger="Show More">
      <div className='stats'>
        <h4 className="test">HOW FAST YOU ARE MOVING RIGHT NOW</h4>
        <h6 className="test">distance from new york to san francisco: <span>2,569 miles</span></h6>
        <h6 className="test">distance from san francisco to paris: <span>5,560 miles</span> </h6>
        <h6 className="test">distance from new york to australia: <span>10,512 miles</span></h6>
        <h6 className="test">circumference of the earth: <span>24,901 miles</span></h6>
        <h6 className="test">distance to the moon: <span>238,900 miles</span></h6>
      </div>
      <section className="details">
        <div className="title">
          <p className="test">elapsed time since you arrived on this page in seconds</p>
          <p className="test">Distance covered in miles due to Earth spinning</p>
          <p className="test">Distance covered in miles due to the Earth orbiting the Sun</p>
          <p className="test">Distance covered in miles due to the Solar system orbiting in the galaxy</p>
          <p className="test">Distance covered in miles due to the Milky Way moving towards Andromeda</p>
          <p className="test">Your total distance covered in that time</p>
        </div>
        <div className="counter-info">
          <p className="test">{counter(timeInSeconds, (timeInSeconds + 1000000), 1)}</p>
          <p className="test">{counter(earthSpin, (earthSpin + 280000), 1)}</p>
          <p className="test">{counter(earthOrbit, (earthOrbit, 18500000))}</p>
          <p className="test">{counter(solarSystemOrbit, (solarSystemOrbit, 124450000))}</p>
          <p className="test">{counter(galaxyMovement, (galaxyMovement, 70000000))}</p>
          <p className="test">{counter(totalMovement, (totalMovement, 213230000))}</p>
        </div>
      </section>
    </Collapsible>
  )
}

export default Distances;