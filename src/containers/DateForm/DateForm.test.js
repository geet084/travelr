import React from 'react';
import { shallow } from 'enzyme';
import DateForm from './DateForm';
import { mapStateToProps, mapDispatchToProps } from './DateForm'


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

  it('should mapStateToProps', () => {
    const mockState = {
      userInfo: {
        userDate: 'Oct, 1, 2018',
        elapsedDays: 199
      },
      extra: 'stuff',
      things: 'things'
    }
    const expected = {
      userDate: 'Oct, 1, 2018',
      elapsedDays: 199,
    }
    const mappedProps = mapStateToProps(mockState);
    expect(mappedProps).toEqual(expected)
  })
})