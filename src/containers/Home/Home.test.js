import React from 'react';
import { shallow } from 'enzyme';
import { Home } from './Home';
import moment from 'moment';

describe('Home', () => {
  let wrapper;
  const mockArrivalTime = moment('Mon, 1 Oct 2018 9:00 AM', 'ddd, DD MMM YYYY HH:mm:ss ZZ');
  moment.now = jest.fn().mockReturnValue(mockArrivalTime);

  beforeEach(() => {
    const mockProps = {
      url: 'http://someurl',
      arrivalTime: {_d: '1538373600000'},
    };

    wrapper = shallow(<Home {...mockProps} />);
  });

  describe('initial state', () => {
    it('should have an initial default state', () => {
      const mockProps = {
        url: 'http://someurl',
        arrivalTime: mockArrivalTime,
      };
      wrapper = shallow(<Home {...mockProps} />, { disableLifecycleMethods: true });

      const expected = {
        today: '',
        userDate: '',
        elapsedTime: 0,
        elapsed: {
          timeInSeconds: 0,
          earthSpin: 0,
          earthOrbit: 0,
          solarSystemOrbit: 0,
          galaxyMovement: 0,
          totalMovement: 0
        }
      };

      expect(wrapper.state()).toEqual(expected);
    });

    it('should match initial snapshot', () => {
      const mockProps = {
        url: 'http://someurl',
        arrivalTime: { _d: '0'},
      };
      wrapper = shallow(<Home {...mockProps} />, { disableLifecycleMethods: true });

      expect(wrapper).toMatchSnapshot();
    });

    it('call calculateDateAndTime when component mounds', () => {
      const mockProps = {
        url: 'http://someurl',
        arrivalTime: mockArrivalTime,
      };
      wrapper = shallow(<Home {...mockProps} />, { disableLifecycleMethods: true });
      wrapper.instance().calculateDateAndTime = jest.fn();

      wrapper.instance().componentDidMount();

      expect(wrapper.instance().calculateDateAndTime).toHaveBeenCalledTimes(1);
    });
  });

  describe('calculateDateAndTime', () => {
    it('should calculate date and time ', () => {
      const expected = {
        today: mockArrivalTime._d,
        elapsed: {
          timeInSeconds: 32400,
          earthSpin: 9072,
          earthOrbit: 599400,
          solarSystemOrbit: 4032180,
          galaxyMovement: 2268000,
          totalMovement: 6908652
        }
      };

      wrapper.instance().calculateDateAndTime()

      expect(wrapper.state('timeInSeconds')).toEqual(expected.timeInSeconds);
      expect(wrapper.state('today')._d).toEqual(expected.today);
      expect(wrapper.state('earthSpin')).toEqual(expected.earthSpin);
      expect(wrapper.state('earthOrbit')).toEqual(expected.earthOrbit);
      expect(wrapper.state('solarSystemOrbit')).toEqual(expected.solarSystemOrbit);
      expect(wrapper.state('galaxyMovement')).toEqual(expected.galaxyMovement);
      expect(wrapper.state('totalMovement')).toEqual(expected.totalMovement);
    });
  });

  describe('updateUserDate', () => {
    it('should update state with the user entered date and calculated elapsed time', () => {
      const mockDate = moment('09-21-2018', 'MM-DD-YYYY');
      const expected = {
        userDate: mockDate._d,
        elapsedTime: 864000000,
      };

      wrapper.instance().updateUserDate(mockDate);

      expect(wrapper.state('userDate')._d).toEqual(expected.userDate);
      expect(wrapper.state('elapsedTime')).toEqual(expected.elapsedTime);
    });
  });
});