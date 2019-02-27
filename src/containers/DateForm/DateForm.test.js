import React from 'react';
import { shallow } from 'enzyme';
import { DateForm } from './DateForm';
import { mapDispatchToProps } from './DateForm'

describe('DateForm', () => {
  let wrapper;
  const mockToday = 'Mon Oct 01 2018'
  const mockSetUserInfo = jest.fn()
  
  beforeEach(() => {
    wrapper = shallow(<DateForm setUserInfo={mockSetUserInfo} today={mockToday} />)
  })

  describe('initial state', () => {
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    })

    it('should have a default state', () => {
      const expected = {
        minDate: '0000-01-01',
        maxDate: '2018-10-02',
        userDate: '',
        elapsedDays: 0,
      }
      expect(wrapper.state()).toEqual(expected)

    })
  })

  describe('handleDate', () => {
    it('should handle the date the user types in', () => {
      const constantDate = new Date('10-02-2018')
      /*eslint no-global-assign:off*/
      Date = class extends Date {
        constructor() {
          return constantDate
        }
      }
      const initial = new Date('10-02-2018')
      const currentDate = 'Tue Oct 2 2018'
      initial.setDate(initial.getDate() - 1);

      const expectedElapsedDays = 0
      
      
      wrapper.instance().handleDate(initial.toDateString())
      expect(wrapper.state('userDate')).toEqual(currentDate)
      expect(wrapper.state('elapsedDays')).toEqual(expectedElapsedDays)
    })
  })

  describe('matchDispatchToProps', () => {
    it('should mapDispatchToProps', () => {
      const mockDispatch = jest.fn();
      const mockUserInfo = 'I am a user'
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.setUserInfo(mockUserInfo);
      expect(mockDispatch).toHaveBeenCalled()
    })
  })
})