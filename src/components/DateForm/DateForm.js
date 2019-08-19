import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class DateForm extends Component {
  constructor() {
    super();
    this.monthRef = React.createRef();
    this.dayRef = React.createRef();
    this.yearRef = React.createRef();
    this.state = {
      month: '',
      day: '',
      year: '',
    };
  }

  componentWillUpdate(prevProps, prevState) {
    const { month, day, year } = prevState;
    const isFullDate = month.length === 2 && day.length === 2 && year.length === 4;

    if (isFullDate) this.props.updateUserDate(`${month}-${day}-${year}`);
  }

  buildDateInputs(dateTypes) {
    return Object.keys(dateTypes).map(key => {
      let dateType = dateTypes[key];
      return (
        <input
          id={key}
          key={key}
          max={dateType.max}
          maxLength={dateType.length}
          min={dateType.min}
          onBlur={this.handleDateInput}
          onChange={this.handleDateInput}
          placeholder={dateType.placeholder}
          ref={`${key}Ref`}
          type='text'
          value={this.state[key]}
        />
      );
    });
  }

  handleDateInput = ({ target }) => {
    const value = this.handleNumberVerification(target);
    
    this.handleInputFocus(target, value);
    this.setState({ [target.id]: value });
  };

  handleNumberVerification = ({ value, min, max }) => {
    value = value.trim()
    const isNumber = Number(value) >= 0 && Number(value) <= Number(max);
    const higherThanMax = Number(value) >= Number(max);
    const lessThanMin = value.length === max.length && Number(value) < Number(min);
    if (lessThanMin) return min
    else if (higherThanMax) return max
    else if(!isNumber) return NaN
    else return value
  }

  handleInputFocus(target, value) {
    const isMaxLength = value.length === target.maxLength

    if (target.id === 'month' && isMaxLength) this.refs.dayRef.focus();
    if (target.id === 'day' && isMaxLength) this.refs.yearRef.focus();
    if (target.id === 'year' && isMaxLength) this.refs.yearRef.blur();
  }

  render() {
    const dateTypes = {
      month: { placeholder: 'mm', length: 2, min: '01', max: '12' },
      day: { placeholder: 'dd', length: 2, min: '01', max: '31' },
      year: { placeholder: 'yyyy', length: 4, min: '0100', max: '2999' }
    };
    const dateInputs = this.buildDateInputs(dateTypes);

    return (
      <div className='date-form'>
        <form id='form'>
          {dateInputs}
        </form>
      </div>
    );
  }
}

DateForm.propTypes = {
  updateUserDate: PropTypes.func
};

export default DateForm;