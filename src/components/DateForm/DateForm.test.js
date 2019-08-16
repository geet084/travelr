import React from 'react';
import { shallow } from 'enzyme';
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
})