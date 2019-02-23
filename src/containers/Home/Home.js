import React, { Component } from 'react'
import CountUp from 'react-countup';
import DateInput from 'date-input';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      time: 0,
      today: '',
      userDate: null,
      elapsedDays: 0,
      showMore: false
    }
  }
  componentDidMount = () => {
    this.calcTime(this.props.time)
    const date = new Date();
    this.setState({ today: date.toISOString() })
  }

  calcTime = (arrivalTime) => {
    const now = Date.now() / 1000
    let time = now - (arrivalTime / 1000)
    if (time === now) time = 0
    this.setState({ time })
  }

  counter = (start, stop, decimal = 0, suffix = ' miles per second') => {
    return (
      <CountUp
        start={start} end={stop} decimals={decimal} suffix={suffix} duration='1000000' delay={0} useEasing={false} separator=','>
        {({ countUpRef }) => <span ref={countUpRef} />}
      </CountUp>
    )
  }

  showMoreLess = () => {
    this.setState({ showMore: !this.state.showMore })
  }

  handleDate = (e) => {
    const userDate = new Date(e);
    const singleDay = (1000 * 60 * 60 * 24);
    const thisTime = new Date();
    const diff = thisTime.getTime() - userDate.getTime();
    const elapsedDays = Math.floor(diff / singleDay)
    
    const date = e.split('')

    if (date.length < 10 || elapsedDays <= 0) this.setState({ userDate, elapsedDays: 0 });
    else this.setState({ userDate, elapsedDays })
  }

  render() {
    const { url } = this.props;
    let { time } = this.state;
    let timeInSeconds = this.counter((time), 1000000, 1, ' seconds')
    let earthSpin = this.counter((time * .28), 280000, 1)
    let earthOrbit = this.counter((time * 18.5), 18500000)
    let solarSystemOrbit = this.counter((time * 124.45), 124450000)
    let galaxyMovement = this.counter((time * 70), 70000000)
    let totalMovement = this.counter((time * 213.23), 213230000)

    return (
      <div className='home'>
        <img className='apod-img' src={url} alt="apod" />
        <header className="App-header">
          <label htmlFor="">input a date
            <div className="counter">
              <DateInput shouldValidate minDate="0000-01-01" maxDate={this.state.today} onChange={this.handleDate} />
            </div>
            {this.state.elapsedDays !== 0 &&
              <div>
                <p>elapsed days: {this.state.elapsedDays.toLocaleString()}</p>
                <p>total distance: {(this.state.elapsedDays * 24000).toLocaleString()} miles</p>
              </div>}
          </label>
          {!this.state.showMore && this.state.elapsedDays > 0 && <button onClick={this.showMoreLess}>Show More</button>}
          {this.state.showMore && <button onClick={this.showMoreLess}>Show Less</button>}
        </header>
        {
          this.state.showMore &&
          <section>
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
          </section>
        }
      </div>
    )
  }
}

export default Home;