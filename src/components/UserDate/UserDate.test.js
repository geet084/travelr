import React from 'react';
import { shallow } from 'enzyme';
import { UserDate } from './UserDate';

describe('UserDate', () => {
  let wrapper;

  beforeEach(() => {
    const mockProps = {
      days: 3,
      hours: 7,
      num: 123456789,
    }
    wrapper = shallow(<UserDate {...mockProps}/>);
  });

  describe('initial state', () => {
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
