import React, { Component } from 'react'
import DateInput from 'date-input';

export class DateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: this.props.today,
      userDate: null,
      elapsedDays: 0,
    }
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
    return <header className="App-header">
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
      {!this.state.showMore && this.state.elapsedDays > 0 && <button onClick={this.props.showMoreLess}>Show More</button>}
      {this.state.showMore && <button onClick={this.props.showMoreLess}>Show Less</button>}
    </header>
  }
}

export default DateForm;