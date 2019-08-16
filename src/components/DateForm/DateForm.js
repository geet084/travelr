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