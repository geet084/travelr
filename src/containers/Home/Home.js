import React, { Component } from 'react';
import CountUp from 'react-countup';
import { DateForm } from '../';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      time: 0,
      today: '',
    }
  }

  componentDidMount = () => {
    this.calculateDateAndTime();
  }

  calculateDateAndTime = () => {
    const now = Date.now() / 1000;
    let time = now - (this.props.time / 1000);
    const date = new Date();
    date.setDate(date.getDate() - 1);
    if (time === now) time = 0;

    this.setState({ time, today: date.toDateString() });
  }

  counter = (start, stop, decimal = 0) => {
    return (
      <CountUp
        start={start} end={stop} decimals={decimal} duration='1000000' delay={0} useEasing={false} separator=','>
        {({ countUpRef }) => <span ref={countUpRef} />}
      </CountUp>
    );
  }

  render() {
    const { url } = this.props;
    let { time, today } = this.state;
    let timeInSeconds = this.counter((time), 1000000, 1);
    let earthSpin = this.counter((time * .28), 280000, 1);
    let earthOrbit = this.counter((time * 18.5), 18500000);
    let solarSystemOrbit = this.counter((time * 124.45), 124450000);
    let galaxyMovement = this.counter((time * 70), 70000000);
    let totalMovement = this.counter((time * 213.23), 213230000);

    return (
      <div className='home'>
        <img className='apod-img' src={url} alt="apod" />
        <header>
          <div className="prompt">
            <h3>How far do you think you've traveled today?</h3>
            <h3>How far have you traveled this week?</h3>
            <h3>Enter a date to find out</h3>
          </div>
          <DateForm key={today} today={today} />
        </header>
        <div className='stats'>
          <h4>HOW FAST YOU ARE MOVING RIGHT NOW</h4>
          <h6>distance from new york to san francisco: <span>2,569 miles</span></h6>
          <h6>distance from san francisco to paris: <span>5,560 miles</span> </h6>
          <h6>distance from new york to australia: <span>10,512 miles</span></h6>
          <h6>circumference of the earth: <span>24,901 miles</span></h6>
          <h6>distance to the moon: <span>238,900 miles</span></h6>
        </div>
        <section className="details">
          <div className="title">
            <p>elapsed time since you arrived on this page in seconds</p>
            <p>Earth spinning miles per second</p>
            <p>Earth orbiting the Sun miles per second</p>
            <p>Solar system orbiting in the galaxy miles per second</p>
            <p>Milky Way moving towards Andromeda miles per second</p>
            <p>Your total speed right now in miles per second</p>
          </div>
          <div className="counter-info">
            <p>{timeInSeconds}</p>
            <p>{earthSpin}</p>
            <p>{earthOrbit}</p>
            <p>{solarSystemOrbit}</p>
            <p>{galaxyMovement}</p>
            <p>{totalMovement}</p>
          </div>
        </section>
      </div>
    )
  }
}

export default Home;