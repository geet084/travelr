import React, { Component } from 'react'
import CountUp from 'react-countup';

class Home extends Component {

  counter = (start, stop, decimal = 0, suffix = ' miles per second') => {
    return (
      <CountUp
        start={start} end={stop} decimals={decimal} suffix={suffix} duration='1000000' delay={0} useEasing={false} separator=','>
        {({ countUpRef }) => <span ref={countUpRef} />}
      </CountUp>
    )
  }

  render() {
    const { url } = this.props;
    let timeInSeconds = this.counter(0, 1000000, 1, ' seconds')
    let earthSpin = this.counter(0, 280000, 1)
    let earthOrbit = this.counter(0, 18500000)
    let solarSystemOrbit = this.counter(0, 124450000)
    let galaxyMovement = this.counter(0, 70000000)
    let totalMovement = this.counter(0, 213230000)

    return (
      <div className='home'>
        <img className='apod-img' src={url} alt="apod" />
        <header className="App-header">
          <h4>HOW FAST YOU ARE MOVING RIGHT NOW</h4>
          <h6>distance from new york to san francisco: <span>2,569 miles</span></h6>
          <h6>distance from san francisco to paris: <span>5,560 miles</span> </h6>
          <h6>distance from new york to australia: <span>10,512 miles</span></h6>
          <h6>circumference of the earth: <span>24,901 miles</span></h6>
          <h6>distance to the moon: <span>238,900 miles</span></h6>

          <p>elapsed time</p>
          <p>{timeInSeconds}</p>
          <p>Earth spinning</p>
          <p>{earthSpin}</p>
          <p>Earth orbiting the Sun</p>
          <p>{earthOrbit}</p>
          <p>Solar system orbiting in the galaxy</p>
          <p>{solarSystemOrbit}</p>
          <p>Milky Way moving towards Andromeda</p>
          <p>{galaxyMovement}</p>
          <p>Your total speed right now</p>
          <p>{totalMovement}</p>
        </header>
      </div>
    )
  }
}

export default Home;