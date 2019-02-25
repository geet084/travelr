import React from 'react';
import Home from './Home';
import { shallow } from 'enzyme';

describe('Home', () => {
  let wrapper;
  const mockURL = 'http://someurl';
  const mockTime = 0;
  
  beforeEach(() => {
    wrapper = shallow(<Home url={mockURL} time={mockTime} />)
  })

  describe('initial state', () => {
    
    it.skip('should have an initial state', () => {
      const expected = { time: 0, today: '' };
      //NEED TO PREVENT CDM??
      expect(wrapper.state()).toEqual(expected);
    })

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    })
  })

  describe('calculateDateAndTime', () => {
    it('should calculateDateAndTime ', () => {
      const date = new Date();
      date.setDate(date.getDate() - 1);

      const expected = { time: 0, today: date.toDateString() };
      expect(wrapper.state()).toEqual(expected);
    })
  })
})
