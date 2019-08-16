import React from 'react';
import { shallow, mount } from 'enzyme';
import { DateForm } from './DateForm';

describe('DateForm', () => {
  let wrapper;
  const mockUpdateUserDate = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<DateForm updateUserDate={mockUpdateUserDate} />)
  });

  describe('initial state', () => {
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have a default state', () => {
      const expected = {
        month: '',
        day: '',
        year: '',
      };

      expect(wrapper.state()).toEqual(expected);
    });
  });

  describe('componentWillUpdate', () => {
    const mockMonthEvent = { target: { id: 'month', value: '07', min: '01', max: '12' } };
    const mockDayEvent = { target: { id: 'day', value: '08', min: '01', max: '31' } };
    const mockYearEvent = { target: { id: 'year', value: '1999', min: '0100', max: '2999' } };

    it('should NOT call updateUserDate if date is not complete', () => {
      wrapper.find('#month').simulate('change', mockMonthEvent);

      expect(mockUpdateUserDate).toHaveBeenCalledTimes(0);
    });

    it('should call updateUserDate if the date IS complete', () => {
      const expected = '07-08-1999';

      wrapper.find('#month').simulate('change', mockMonthEvent);
      wrapper.find('#day').simulate('change', mockDayEvent);
      wrapper.find('#year').simulate('change', mockYearEvent);

      expect(mockUpdateUserDate).toHaveBeenCalledWith(expected);
    });
  });

  describe('buildDateInputs', () => {
    const mockDateTypes = {
      month: { placeholder: 'mm', length: 2, min: '01', max: '12' },
      day: { placeholder: 'dddd', length: 5, min: '15', max: '86' },
      year: { placeholder: 'yyyy', length: 4, min: '0100', max: '2999' }
    }
    const expectedKey = 'day';
    // MOCKDATETYPES & EXPECTED KEY 
    // WILL DYNAMICALLY UPDATE THE REST OF THIS TEST

    it('should build date inputs with provided date types object', () => {
      const expected = {
        size: Object.keys(mockDateTypes).length,
        id: expectedKey,
        max: mockDateTypes[expectedKey].max,
        maxLength: mockDateTypes[expectedKey].length,
        min: mockDateTypes[expectedKey].min,
        placeholder: mockDateTypes[expectedKey].placeholder,
        value: '',
      };

      const result = wrapper.instance().buildDateInputs(mockDateTypes);
      const resKey = Object.keys(mockDateTypes).indexOf(expectedKey);

      expect(result.length).toEqual(expected.size);
      expect(result[resKey].props.id).toEqual(expected.id);
      expect(result[resKey].props.max).toEqual(expected.max);
      expect(result[resKey].props.maxLength).toEqual(expected.maxLength);
      expect(result[resKey].props.min).toEqual(expected.min);
      expect(result[resKey].props.placeholder).toEqual(expected.placeholder);
      expect(result[resKey].props.value).toEqual(expected.value);
    });
  });

  describe('handleDateInput', () => {
    const mockMonthEvent = { target: { id: 'month', value: '11', min: '01', max: '12' } };
    const mockDayEvent = { target: { id: 'day', value: '24', min: '01', max: '31' } };
    const mockYearEvent = { target: { id: 'year', value: '2000', min: '0100', max: '2999' } };
    const expectedState = {
      month: '11',
      day: '24',
      year: '2000'
    };

    it('should call handleNumberVerification with target info', () => {
      const mockValue = mockMonthEvent.target.value;
      wrapper.instance().handleNumberVerification = jest.fn().mockImplementation(() => mockValue);

      wrapper.instance().handleDateInput(mockMonthEvent);

      expect(wrapper.instance().handleNumberVerification).toHaveBeenCalledWith(mockMonthEvent.target);
    });

    it('should call handleInputFocus with target and value', () => {
      const mockValue = mockDayEvent.target.value;
      wrapper.instance().handleNumberVerification = jest.fn().mockImplementation(() => mockValue);
      wrapper.instance().handleInputFocus = jest.fn();

      wrapper.instance().handleDateInput(mockDayEvent);

      expect(wrapper.instance().handleInputFocus).toHaveBeenCalledWith(mockDayEvent.target, mockValue);
    });

    it('should update state when a MONTH value is entered', () => {
      wrapper.instance().handleDateInput(mockMonthEvent);

      expect(wrapper.state('month')).toEqual(expectedState.month);
    });

    it('should update state when a DAY value is entered', () => {
      wrapper.instance().handleDateInput(mockDayEvent);

      expect(wrapper.state('day')).toEqual(expectedState.day);
    });

    it('should update state when a YEAR value is entered', () => {
      wrapper.instance().handleDateInput(mockYearEvent);

      expect(wrapper.state('year')).toEqual(expectedState.year);
    });
  });

  describe('handleNumberVerification', () => {
    it('should not accept spaces when tying in a number', () => {
      const mockExtraSpaceTarget = { value: ' 1   ', min: '01', max: '12' };

      const result = wrapper.instance().handleNumberVerification(mockExtraSpaceTarget);
      
      expect(result).toEqual('1');
    })
    
    it('should return same number when within specific input guidelines', () => {
      const mockGoodTarget = { value: '11', min: '01', max: '12' };
      
      const result = wrapper.instance().handleNumberVerification(mockGoodTarget);
      
      expect(result).toEqual(mockGoodTarget.value);
    });
    
    it('should return NaN if anything but a number is entered', () => {
      const mockNaNTarget = { value: 'a', min: '01', max: '31' };
      
      const result = wrapper.instance().handleNumberVerification(mockNaNTarget);
      
      expect(result).toEqual(NaN);
    });
    
    it('should return the maximum if the number entered is too large', () => {
      const mockTooBigTarget = { value: '9999', min: '01', max: '12' };
      
      const result = wrapper.instance().handleNumberVerification(mockTooBigTarget);
      
      expect(result).toEqual('12');
    });
    
    it('should return the minimum if the number entered is too small', () => {
      const mockTooSmallTarget = { value: '0070', min: '0100', max: '2999' };
      
      const result = wrapper.instance().handleNumberVerification(mockTooSmallTarget);

      expect(result).toEqual('0100');
    });
  });

  describe('handleInputFocus', () => {
    let wrapper;
    let refs = ['monthRef', 'dayRef', 'yearRef'];
    
    beforeEach(() => {
      wrapper = mount(<DateForm updateUserDate={mockUpdateUserDate} />);
      refs.map(ref => wrapper.instance().refs[ref].focus = jest.fn());
      wrapper.instance().refs.yearRef.blur = jest.fn();
    });
    
    it('should change focus to the day input when month is filled out', () => {
      const mockMonthTarget = { id: 'month', value: '02', maxLength: 2 };
      
      wrapper.instance().handleInputFocus(mockMonthTarget, mockMonthTarget.value);
      
      expect(wrapper.instance().refs.monthRef.focus).toHaveBeenCalledTimes(0);
      expect(wrapper.instance().refs.dayRef.focus).toHaveBeenCalledTimes(1);
      expect(wrapper.instance().refs.yearRef.focus).toHaveBeenCalledTimes(0);
    });
    
    it('should change focus to the year input when day is filled out', () => {
      const mockDayTarget = { id: 'day', value: '16', maxLength: 2 };
      
      wrapper.instance().handleInputFocus(mockDayTarget, mockDayTarget.value);
      
      expect(wrapper.instance().refs.dayRef.focus).toHaveBeenCalledTimes(0);
      expect(wrapper.instance().refs.yearRef.focus).toHaveBeenCalledTimes(1);
    });
    
    it('should change focus off of the year input when it is filled out', () => {
      const mockYearTarget = { id: 'year', value: '1900', maxLength: 4 };
      
      wrapper.instance().handleInputFocus(mockYearTarget, mockYearTarget.value);

      expect(wrapper.instance().refs.yearRef.focus).toHaveBeenCalledTimes(0);
      expect(wrapper.instance().refs.yearRef.blur).toHaveBeenCalledTimes(1);
    });
  });
});