import React, { Component } from 'react';
import CountUp from 'react-countup';
import DateForm from '../../components/DateForm/DateForm';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import UserDate from '../../components/UserDate/UserDate';
import Distances from '../../components/Distances/Distances';

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
    const { arrivalTime } = this.props;
    const now = moment();

    const elapsedTimeSinceArrival = now.diff(arrivalTime);
    const timeInSeconds = elapsedTimeSinceArrival / 1000

    this.setState({
      timeInSeconds,
      today: now,
      earthSpin: (timeInSeconds * .28),
      earthOrbit: (timeInSeconds * 18.5),
      solarSystemOrbit: (timeInSeconds * 124.45),
      galaxyMovement: (timeInSeconds * 70),
      totalMovement: (timeInSeconds * 213.23),
    });
  }

  updateUserDate = (inputDate) => {
    // TODO: set time to a local noon or midnight?
    const { arrivalTime } = this.props;
    const userDate = moment(inputDate, 'MM-DD-YYYY');
    const elapsedTime = moment(arrivalTime).diff(userDate);
    
    this.setState({
      userDate,
      elapsedTime
    });
  }

  counter = (start, end, decimal = 0) => {
    //IGNORING COUNTUP PACKAGE FOR TESTING ... COUNTUPREF IS NOT TESTABLE
    /* istanbul ignore next line */
    return (
      <CountUp
        start={start} end={end} decimals={decimal} duration='1000000' delay={0} useEasing={false} separator=','>
        {({ countUpRef }) => <span ref={countUpRef} />}
      </CountUp>
    );
  }

  render() {
    const { url } = this.props;
    let { userDate, today, timeInSeconds, earthSpin, earthOrbit, solarSystemOrbit, galaxyMovement, totalMovement, } = this.state;

    const hasDate = today !== ''

    const days = hasDate ? today.diff(userDate, 'days') : 0
    const hours = hasDate ? today.diff(userDate, 'hours') - (days * 24) : 0
    const todaysDate = hasDate ? today.format('llll') : '';

    const total = ((days + (hours / 24)) * 18424000);
    const num = this.counter((total + totalMovement), (total + totalMovement + 213230000), 1);
    
    return (
      <div className='home'>
        <img className='apod-img' src={url} alt="apod" />
        <header>
          <div className="prompt">
            <h3 className="test">How far do you think you've traveled today?</h3>
            <h3 className="test">How far have you traveled this week?</h3>
            <h3 className="test">Today is: {todaysDate}</h3>
            <h3 className="test input-date">
              Enter a date to find out:
              <DateForm key={userDate} updateUserDate={this.updateUserDate} />
            </h3>
            {userDate !== '' && <UserDate userDate={userDate.format('llll')} days={days} hours={hours} num={num} />}
          </div>
        </header>
        {
          this.state.userDate !== '' &&
          <Distances
            counter={this.counter}
            timeInSeconds={timeInSeconds}
            earthSpin={earthSpin}
            earthOrbit={earthOrbit}
            solarSystemOrbit={solarSystemOrbit}
            galaxyMovement={galaxyMovement}
            totalMovement={totalMovement}
          />
        }
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  arrivalTime: state.arrivalTime,
})

Home.propTypes = {
  arrivalTime: PropTypes.object,
  url: PropTypes.string,
}

Home.defaultProps = {
  arrivalTime: {},
  url: '',
}

export default connect(mapStateToProps)(Home);