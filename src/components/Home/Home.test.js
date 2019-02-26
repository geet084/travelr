import React from 'react';
import Home from './Home';
import { shallow } from 'enzyme';

describe('Home', () => {
  let wrapper;
  const mockURL = 'http://someurl';
  const mockTime = 29000;
  const mockUserInfo = { arrivalTime: mockTime, elapsedTime: 2 };
  
  beforeEach(() => {
    Date.now = jest.fn(() => 33000)
    wrapper = shallow(<Home url={mockURL} time={mockTime} userInfo={mockUserInfo}/>)
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
      const expected = {
        timeInSeconds: 4,
        today: date.toDateString(),
        earthSpin: 1.12,
        earthOrbit: 74,
        solarSystemOrbit: 497.8,
        galaxyMovement: 280,
        totalMovement: 852.92,
      };

      wrapper.instance().calculateDateAndTime()
      expect(wrapper.state()).toEqual(expected);
    })
  })
})
