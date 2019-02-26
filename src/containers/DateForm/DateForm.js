import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setUserInfo } from '../../actions'
import DateInput from 'date-input';

export class DateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minDate: '0000-01-01',
      maxDate: '',
    }
  }

  componentDidMount = () => {
    this.setMaxDate();
  }

  setMaxDate = () => {
    const date = new Date(this.props.today);
    let month = '' + (date.getMonth() + 1);
    let day = '' + (parseInt(date.getDate()) + 1);
    const year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    const maxDate = [year, month, day].join('-');

    this.setState({ maxDate });
  }

  handleDate = (e) => {
    let userDate = new Date(e);
    userDate.setDate(userDate.getDate());
    const singleDay = (1000 * 60 * 60 * 24);
    const thisTime = new Date();
    const diff = thisTime.getTime() - userDate.getTime();
    let elapsedDays = (diff / singleDay);
    const date = e.split('');

    elapsedDays = this.fixElapsedDays(elapsedDays, date);
    userDate = this.fixDateError(userDate);

    this.setState({ userDate, elapsedDays });
    this.props.setUserInfo({ userDate, elapsedDays })
  }

  fixElapsedDays = (elapsedDays, date) => {
    let days;
    if (date.length < 10 || elapsedDays <= 0) days = 0;
    else days = elapsedDays.toFixed(2);
    return days;
  }

  fixDateError = (date) => {
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    date = date.toDateString().split(' ');
    date[0] = (days[days.indexOf(date[0]) + 1]);
    date[2] = (parseInt(date[2]) + 1).toString();

    return date.join(' ');
  }

  render() {
    const { maxDate, minDate } = this.state;

    return (
      <div className="date-form">
        <DateInput shouldValidate minDate={minDate} maxDate={maxDate} onChange={this.handleDate} />
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  setUserInfo: (userInfo) => dispatch(setUserInfo(userInfo)),
})

export default connect(null, mapDispatchToProps)(DateForm);