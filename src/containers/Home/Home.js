import React, { Component } from 'react';
import CountUp from 'react-countup';
import DateForm from '../../components/DateForm/DateForm';
import Collapsible from 'react-collapsible';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      today: '',
      userDate: '',
      elapsedTime: 0,
      timeInSeconds: 0,
      earthSpin: 0,
      earthOrbit: 0,
      solarSystemOrbit: 0,
      galaxyMovement: 0,
      totalMovement: 0,
    }
  }

  componentDidMount = () => {
    this.calculateDateAndTime();
  }

  calculateDateAndTime = () => {
    const arrivalTime = parseInt(this.props.arrivalTime);
    const now = parseInt(moment().format('x'));
    const elapsedTimeSinceArrival = (now - arrivalTime) / 1000;
    const timeInSeconds = (arrivalTime === 0) ? .001 : elapsedTimeSinceArrival
    const today = moment().format('llll');

    this.setState({
      timeInSeconds,
      today,
      earthSpin: (timeInSeconds * .28),
      earthOrbit: (timeInSeconds * 18.5),
      solarSystemOrbit: (timeInSeconds * 124.45),
      galaxyMovement: (timeInSeconds * 70),
      totalMovement: (timeInSeconds * 213.23),
    });
  }

  updateUserDate = (enteredDate) => {
    // TODO: set time to a local noon or midnight?
    const { arrivalTime } = this.props;
    const userDate = moment(enteredDate).format('llll');
    const elapsedTime = moment(arrivalTime).diff(moment(enteredDate), 'x');

    this.setState({
      userDate,
      elapsedTime
    });
  }

  counter = (start, end, decimal = 0) => {
    return (
      <CountUp
        start={start} end={end} decimals={decimal} duration='1000000' delay={0} useEasing={false} separator=','>
        {({ countUpRef }) => <span ref={countUpRef} />}
      </CountUp>
    );
  }

  render() {
    const { url, userInfo } = this.props;
    const { userDate, elapsedDays } = this.props.userInfo;
    let { today, timeInSeconds, earthSpin, earthOrbit, solarSystemOrbit, galaxyMovement, totalMovement, } = this.state;

    let userEnteredDate = moment(this.state.userDate)
    let arrivalDate = moment(this.state.today)

    const hasUserDate = this.state.userDate !== '';
    const days = hasUserDate ? arrivalDate.diff(userEnteredDate, 'days') : 0
    const hours = hasUserDate ? arrivalDate.diff(userEnteredDate, 'hours') - (days * 24) : 0
    const total = ((days + (hours / 24)) * 18424000);

    const num = this.counter((total + totalMovement), (total + totalMovement + 213230000), 1);

    return (
      <div className='home'>
        <img className='apod-img' src={url} alt="apod" />
        <header>
          <div className="prompt">
            <h3 className="test">How far do you think you've traveled today?</h3>
            <h3 className="test">How far have you traveled this week?</h3>
            <h3 className="test input-date">
              Enter a date to find out:
              <DateForm className="test" key={this.state.userDate} today={today} updateUserDate={this.updateUserDate} />
            </h3>
            {
              days !== 0 &&
              <div>
                <p className="test">Time elapsed since {this.state.userDate}: </p>
                <p className="test">
                  <span>{days} days and </span>
                  <span> ~{hours} hours</span>
                </p>
                <p className="test">Approx. total miles you've gone in that time: </p>
                <p className="test user-dist">{num}</p>
              </div>
            }
          </div>
        </header>
        {
          days !== 0 &&
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
                <p className="test">{this.counter(timeInSeconds, (timeInSeconds + 1000000), 1)}</p>
                <p className="test">{this.counter(earthSpin, (earthSpin + 280000), 1)}</p>
                <p className="test">{this.counter(earthOrbit, (earthOrbit, 18500000))}</p>
                <p className="test">{this.counter(solarSystemOrbit, (solarSystemOrbit, 124450000))}</p>
                <p className="test">{this.counter(galaxyMovement, (galaxyMovement, 70000000))}</p>
                <p className="test">{this.counter(totalMovement, (totalMovement, 213230000))}</p>
              </div>
            </section>
          </Collapsible>
        }
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  arrivalTime: state.arrivalTime,
  userInfo: state.userInfo,
})

Home.propTypes = {
  time: PropTypes.number,
  url: PropTypes.string,
  userInfo: PropTypes.object,
}

Home.defaultProps = {
  time: 0,
  url: '',
  userInfo: {},
}

export default connect(mapStateToProps)(Home);