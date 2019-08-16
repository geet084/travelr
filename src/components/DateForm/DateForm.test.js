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

  describe('buildDateInputs', () => {
    it('should build date inputs with provided date types object', () => {
      const mockDateTypes = {
        month: { placeholder: 'mm', length: 2, min: '01', max: '12' },
        day: { placeholder: 'dddd', length: 5, min: '15', max: '86' },
        year: { placeholder: 'yyyy', length: 4, min: '0100', max: '2999' }
      }
      const result = wrapper.instance().buildDateInputs(mockDateTypes);

      expect(result.length).toEqual(3);
      expect(result[1].props.id).toEqual('day');
      expect(result[1].props.max).toEqual('86');
      expect(result[1].props.maxLength).toEqual(5);
      expect(result[1].props.min).toEqual('15');
      expect(result[1].props.placeholder).toEqual('dddd');
      expect(result[1].props.value).toEqual('');
    });
  });
});