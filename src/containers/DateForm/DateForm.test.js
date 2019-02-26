import React from 'react';
import { shallow } from 'enzyme';
import DateForm from './DateForm';
import { mapDispatchToProps } from './DateForm'


describe('DateForm', () => {
  let wrapper;
  const mockToday = 'Mon Oct 01 2018'

  beforeEach(() => {
    wrapper = shallow(<DateForm today={mockToday} />)
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should mapDispatchToProps', () => {
    const mockDispatch = jest.fn();
    const mockUserInfo = 'I am a user'
    const mappedProps = mapDispatchToProps(mockDispatch);

    mappedProps.setUserInfo(mockUserInfo);
    expect(mockDispatch).toHaveBeenCalled()
  })

})