import React, { Component } from 'react';
import DateForm from '../../components/DateForm/DateForm';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import UserDate from '../../components/UserDate/UserDate';
import Distances from '../../components/Distances/Distances';
import Counter from '../../components/Counter/Counter';

export class Home extends Component {
  state = {
    today: '',
    userDate: '',
    elapsedTime: 0,
    elapsed: {
      timeInSeconds: 0,
      earthSpin: 0,
      earthOrbit: 0,
      solarSystemOrbit: 0,
      galaxyMovement: 0,
      totalMovement: 0
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
      today: now,
      elapsed: {
        timeInSeconds,
        earthSpin: (timeInSeconds * .28),
        earthOrbit: (timeInSeconds * 18.5),
        solarSystemOrbit: (timeInSeconds * 124.45),
        galaxyMovement: (timeInSeconds * 70),
        totalMovement: (timeInSeconds * 213.23)
      }
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

  render() {
    const { url } = this.props;
    let { userDate, today, elapsed } = this.state;

    const days = today !== '' ? today.diff(userDate, 'days') : 0
    const hours = today !== '' ? today.diff(userDate, 'hours') - (days * 24) : 0
    const todaysDate = today !== '' ? today.format('llll') : '';

    const total = ((days + (hours / 24)) * 18424000) + elapsed.totalMovement;
    const num = <Counter start={(total)} end={(total + 213230000)} decimal={1} />;

    return (
      <div className='home'>
        <img className='apod-img' src={url} alt="apod" />
        <header>
          <div className="prompt">
            <h3>How far do you think you've traveled today?</h3>
            <h3>How far have you traveled this week?</h3>
            <h3>Today is: {todaysDate}</h3>
            <h3>
              Enter a date to find out:
              <DateForm key={userDate} updateUserDate={this.updateUserDate} />
            </h3>
            {
              userDate !== '' &&
              <UserDate userDate={userDate.format('llll')} days={days} hours={hours} num={num} />
            }
          </div>
        </header>
        {userDate !== '' && <Distances {...elapsed} />}
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