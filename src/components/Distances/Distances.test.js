import React from 'react';
import { shallow } from 'enzyme';
import { Distances } from './Distances';

describe('Distances', () => {
  let wrapper;

  beforeEach(() => {
    const mockProps = {
      counter: jest.fn(),
      timeInSeconds: .01,
      earthSpin: (.01 * .28),
      earthOrbit: (.01 * 18.5),
      solarSystemOrbit: (.01 * 124.45),
      galaxyMovement: (.01 * 70),
      totalMovement: (.01 * 213.23),
    }
    wrapper = shallow(<Distances {...mockProps} />)
  });

  describe('initial state', () => {
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});