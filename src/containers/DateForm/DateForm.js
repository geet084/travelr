import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserInfo } from '../../actions';
// import DateInput from 'date-input';
import PropTypes from 'prop-types';

export class DateForm extends Component {
  constructor() {
    super();
    this.monthRef = React.createRef();
    this.dayRef = React.createRef();
    this.yearRef = React.createRef();
    this.state = {
      minDate: '0000-01-01',
      maxDate: '',
      userDate: '',
      elapsedDays: 0,
      month: '',
      day: '',
      year: '',
    };
  }

  componentDidMount = () => {
    this.setMaxDate();
  };

  setMaxDate = () => {
    const date = new Date(this.props.today);
    let month = '' + (date.getMonth() + 1);
    let day = '' + (parseInt(date.getDate()) + 1);
    const year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    const maxDate = [year, month, day].join('-');

    this.setState({ maxDate });
  };

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
    if (elapsedDays > 0) this.props.setUserInfo({ userDate, elapsedDays });
  };

  fixElapsedDays = (elapsedDays, date) => {
    let days;
    if (date.length < 10 || elapsedDays <= 0) days = 0;
    else days = elapsedDays.toFixed(2);
    return days;
  };

  fixDateError = (date) => {
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    date = date.toDateString().split(' ');
    date[0] = (days[days.indexOf(date[0]) + 1]);
    date[2] = (parseInt(date[2]) + 1).toString();

    return date.join(' ');
  };

  buildDateInputs(dateTypes) {
    return Object.keys(dateTypes).map(key => {
      let dateType = dateTypes[key];
      return (
        <input
          id={key}
          key={key}
          max={dateType.max}
          maxLength={dateType.length}
          onBlur={this.verifyDateInput}
          onChange={this.verifyDateInput}
          placeholder={dateType.placeholder}
          ref={`${key}Ref`}
          type='text'
          value={this.state[key]}
        />
      );
    });
  }

  verifyDateInput = ({ target }) => {
    let value = this.state[target.id];
    const isNumber = Number(target.value) >= 0 && Number(target.value) <= Number(target.max);
    const higherThanMax = Number(target.value) >= Number(target.max);

    if (isNumber) value = target.value;
    else if (higherThanMax) value = target.max;

    if (target.id === 'month' && value.length === 2) this.refs.dayRef.focus();
    if (target.id === 'day' && value.length === 2) this.refs.yearRef.focus();
    if (target.id === 'year' && value.length === 4) this.refs.yearRef.blur();

    this.setState({ [target.id]: value });
  };

  render() {
    const dateTypes = {
      month: { placeholder: 'mm', length: 2, max: 12 },
      day: { placeholder: 'dd', length: 2, max: 31 },
      year: { placeholder: 'yyyy', length: 4, max: 2999 }
    };
    const dateInputs = this.buildDateInputs(dateTypes);

    return (
      <div className='date-form'>
        {/* <DateInput shouldValidate minDate={minDate} maxDate={maxDate} onChange={this.handleDate} /> */}
        <form id='form'>
          {dateInputs}
        </form>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  setUserInfo: (userInfo) => dispatch(setUserInfo(userInfo)),
});

DateForm.propTypes = {
  setUserInfo: PropTypes.func,
  today: PropTypes.string,
};

DateForm.defaultProps = {
  today: '',
};

export default connect(null, mapDispatchToProps)(DateForm);