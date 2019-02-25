import React from 'react';
import { shallow } from 'enzyme';
import Display from './Display';
import { mapStateToProps, mapDispatchToProps } from './Display'

describe('Display', () => {
  let wrapper;
  const mockInfo = ''
  const mockProps = {
    fetchImages: jest.fn(),
    info: mockInfo
  }

  beforeEach(() => {
    wrapper = shallow(<Display {...mockProps} />)
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should mapDispatchToProps', () => {
    const mockDispatch = jest.fn();
    const mockArr = [];
    const mappedProps = mapDispatchToProps(mockDispatch);

    mappedProps.fetchImages(mockArr)
    expect(mockDispatch).toHaveBeenCalled()
  })
  
  it('should mapStateToProps', () => {
    const mockState = {
      images: [{}],
      bodies: ['fake data'],
      planets: ['things and stuff'],
    }
    const expected = {
      images: [{}]
    }
    const mappedProps = mapStateToProps(mockState)
    expect(mappedProps).toEqual(expected)
  })
})