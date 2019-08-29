import React from 'react';
import { shallow } from 'enzyme';
import { ObjectsDisplay, mapStateToProps, mapDispatchToProps } from './ObjectsDisplay';
import { getImageSuccess } from '../../actions';

describe('ObjectsDisplay', () => {
  let wrapper;
  let mockProps;

  describe('initial state with NO props', () => {
    it('should match snapshot with no props', () => {
      mockProps = {
        handleImages: jest.fn(),
        info: { images: [] },
        images: { currentImage: { href: '' } },
      };
      wrapper = shallow(<ObjectsDisplay {...mockProps} />);

      expect(wrapper).toMatchSnapshot();
    })
  })

  describe('initial state with props', () => {
    beforeEach(() => {
      mockProps = {
        handleImages: jest.fn(),
        info: { images: ['image_id'] },
        images: { currentImage: { href: 'some href' } },
      };

      wrapper = shallow(<ObjectsDisplay {...mockProps} />)
    });

    it('should match snapshot with props', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should call handleImages with url when component mounts', () => {
      const expectedUrl = 'https://images-api.nasa.gov/asset/image_id';

      expect(mockProps.handleImages).toHaveBeenCalledWith(expectedUrl, getImageSuccess);
    });
  });

  describe('componentDidUpdate', () => {
    it('should not call getObjectsDisplayImage if there is an href provided', () => {
      mockProps = {
        handleImages: jest.fn(),
        info: { images: ['image_id'] },
        images: { currentImage: { href: 'some href' } },
      };

      wrapper = shallow(<ObjectsDisplay {...mockProps} />);
      wrapper.instance().getDisplayImage = jest.fn();
      wrapper.setProps({ images: { currentImage: { href: '' } } });

      expect(wrapper.instance().getDisplayImage).toHaveBeenCalledTimes(0);
    });

    it('should should call getDisplayImage if there is NO href provided (page reload)', () => {
      mockProps = {
        handleImages: jest.fn(),
        info: { images: ['image_id'] },
        images: { currentImage: { href: '' } },
      };

      wrapper = shallow(<ObjectsDisplay {...mockProps} />);
      wrapper.instance().getDisplayImage = jest.fn();

      wrapper.setProps({ images: { currentImage: { href: '' } } });

      expect(wrapper.instance().getDisplayImage).toHaveBeenCalledTimes(1);
    });
  });

  describe('getDisplayImage', () => {
    it('should get image to display if there is an image id present', () => {
      mockProps = {
        handleImages: jest.fn(),
        info: { images: ['image21'] },
        images: { currentImage: { href: '' } },
      };

      wrapper = shallow(<ObjectsDisplay {...mockProps} />);

      const expectedUrl = 'https://images-api.nasa.gov/asset/image21';

      expect(mockProps.handleImages).toHaveBeenCalledWith(expectedUrl, getImageSuccess);
    });

    it('should NOT get image to display if there is an image id present', () => {
      mockProps = {
        handleImages: jest.fn(),
        info: {},
        images: { currentImage: { href: '' } },
      };

      wrapper = shallow(<ObjectsDisplay {...mockProps} />);

      expect(mockProps.handleImages).not.toBeCalled();
    });
  });

  describe('mapDispatchToProps', () => {
    it('should mapDispatchToProps', () => {
      const mockDispatch = jest.fn();
      const mockArr = [];
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.handleImages(mockArr);
      expect(mockDispatch).toHaveBeenCalled();
    });
  });

  describe('mapStateToProps', () => {
    it('should mapStateToProps', () => {
      const mockState = {
        images: [{}],
        bodies: ['fake data'],
        planets: ['things and stuff'],
      };

      const expected = {
        images: [{}]
      };

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });
});