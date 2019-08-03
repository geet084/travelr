import * as actions from './'

describe('actions', () => {
  describe('isLoading', () => {
    it('should have a type of IS_LOADING', () => {
      const expected = {
        type: 'IS_LOADING',
        isLoading: false
      }

      const result = actions.isLoading(false);
      expect(result).toEqual(expected)
    })
  })

  describe('hasErrored', () => {
    it('should have a type of HAS_ERRORED', () => {
      const expected = {
        type: 'HAS_ERRORED',
        message: 'there was an error'
      }

      const result = actions.hasErrored('there was an error');
      expect(result).toEqual(expected)
    })
  })

  describe('handleApodImage', () => {
    it('should have a type of HANDLE_APOD_IMAGE', () => {
      const expected = {
        type: 'HANDLE_APOD_IMAGE',
        apodImage: { url: 'some url' }
      }

      const result = actions.handleApodImage({ url: 'some url' });
      expect(result).toEqual(expected)
    })
  })

  describe('handleObjectsSuccess', () => {
    it('should have a type of HANDLE_OBJECTS_SUCCESS', () => {
      const expected = {
        type: 'HANDLE_OBJECTS_SUCCESS',
        objects: [{ name: 'earth' }, { name: 'mars' }]
      }

      const result = actions.handleObjectsSuccess([{ name: 'earth' }, { name: 'mars' }]);
      expect(result).toEqual(expected)
    })
  })

  describe('handleObjectImages', () => {
    it('should have a type of HANDLE_OBJECT_IMAGES', () => {
      const expected = {
        type: 'HANDLE_OBJECT_IMAGES',
        objectImages: [{ href: 'some url' }, { href: 'another url' }]
      }

      const result = actions.handleObjectImages([{ href: 'some url' }, { href: 'another url' }]);
      expect(result).toEqual(expected)
    })
  })

  describe('getImageSuccess', () => {
    it('should have a type of GET_IMAGE_SUCCESS', () => {
      const expected = {
        type: 'GET_IMAGE_SUCCESS',
        currentImage: [{ href: 'some url' }, { href: 'another url' }]
      }

      const result = actions.getImageSuccess([{ href: 'some url' }, { href: 'another url' }]);
      expect(result).toEqual(expected)
    })
  })

  describe('setArrivalTime', () => {
    it('should have a type of SET_ARRIVAL_TIME', () => {
      const expected = {
        type: 'SET_ARRIVAL_TIME',
        arrivalTime: 117
      }

      const result = actions.setArrivalTime(117);
      expect(result).toEqual(expected)
    })
  })

  describe('setUserInfo', () => {
    it('should have a type of SET_USER_INFO', () => {
      const expected = {
        type: 'SET_USER_INFO',
        userDate: '10-01-2018',
        elapsedDays: 1.2
      }

      const result = actions.setUserInfo({ userDate: '10-01-2018', elapsedDays: 1.2 });
      expect(result).toEqual(expected)
    })
  })
})