import React from 'react';
import { shallow } from 'enzyme';
import { Counter } from './Counter';

describe('Counter', () => {
  let wrapper;
  const mockProps = {
    start: 4,
    end: 19
  };
  wrapper = shallow(<Counter {...mockProps} />);

  it('should match initial snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});