import React, { Component } from 'react';
import CountUp from 'react-countup';
import { DateForm } from '../../containers';
import Collapsible from 'react-collapsible';

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
            <h3 className="test">How far do you think you've traveled today?</h3>
            <h3 className="test">How far have you traveled this week?</h3>
            <h3 className="test">Enter a date to find out</h3>
          </div>
          <DateForm className="test" key={today} today={today} />
        </header>
        <Collapsible className="test" trigger="Show More">
        
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
            <p className="test">Earth spinning miles per second</p>
            <p className="test">Earth orbiting the Sun miles per second</p>
            <p className="test">Solar system orbiting in the galaxy miles per second</p>
            <p className="test">Milky Way moving towards Andromeda miles per second</p>
            <p className="test">Your total speed right now in miles per second</p>
          </div>
          <div className="counter-info">
            <p className="test">{timeInSeconds}</p>
            <p className="test">{earthSpin}</p>
            <p className="test">{earthOrbit}</p>
            <p className="test">{solarSystemOrbit}</p>
            <p className="test">{galaxyMovement}</p>
            <p className="test">{totalMovement}</p>
          </div>
          </section>
        </Collapsible>
      </div>
    )
  }
}

export default Home;