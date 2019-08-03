import React from 'react';
import { shallow } from 'enzyme';
import { Display } from './Display';
import { mapStateToProps, mapDispatchToProps } from './Display'

describe('Display', () => {
  let wrapper;
  describe('initial state', () => {

    it('should match snapshot with no props', () => {
      const mockProps = {
        handleImages: jest.fn(),
        info: { images: [] },
        images: { currentImage: { href: '' } },
      }
      wrapper = shallow(<Display {...mockProps} />)
      expect(wrapper).toMatchSnapshot();
    })

    it('should match snapshot with props', () => {
      const mockProps = {
        handleImages: jest.fn(),
        info: { images: ['image_id'] },
        images: { currentImage: { href: 'some href' } },
      }
      wrapper = shallow(<Display {...mockProps} />)
      expect(wrapper).toMatchSnapshot();
    })
  })

  describe('mapDispatchToProps', () => {
    it('should mapDispatchToProps', () => {
      const mockDispatch = jest.fn();
      const mockArr = [];
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.handleImages(mockArr)
      expect(mockDispatch).toHaveBeenCalled()
    })
  })

  describe('mapStateToProps', () => {
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
})