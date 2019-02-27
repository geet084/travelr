import React from 'react';
import { shallow } from 'enzyme';
import { Display } from './Display';
import { mapStateToProps, mapDispatchToProps } from './Display'

describe('Display', () => {
  let wrapper;
  describe('initial state', () => {

    it('should match snapshot with no props', () => {
      const mockInfo = undefined
      const mockProps = {
        fetchImages: jest.fn(),
        info: mockInfo,
        images: []
      }
      wrapper = shallow(<Display {...mockProps} />)
      expect(wrapper).toMatchSnapshot();
    })

    it('should match snapshot with props', () => {
      const mockInfo = { name: 'some name' }
      const mockProps = {
        fetchImages: jest.fn(),
        info: mockInfo,
        images: { items: [{ href: 'some url' }] },
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

      mappedProps.fetchImages(mockArr)
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