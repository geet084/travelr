import React from 'react';
import { shallow } from 'enzyme';
import NavBtn from './NavBtn';

describe('NavBtn', () => {
  let wrapper;
  const mockName = 'name';
  const mockPath = '/'

  beforeEach(() => {
    wrapper = shallow(
      <NavBtn name={mockName} path={mockPath} />
    )
  })
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

})