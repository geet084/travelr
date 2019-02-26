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

  describe('fetchApodSuccess', () => {
    it('should have a type of FETCH_APOD_SUCCESS', () => {
      const expected = {
        type: 'FETCH_APOD_SUCCESS',
        content: { url: 'some url' }
      }

      const result = actions.fetchApodSuccess({ url: 'some url' });
      expect(result).toEqual(expected)
    })
  })

  describe('fetchPlanetsSuccess', () => {
    it('should have a type of FETCH_PLANETS_SUCCESS', () => {
      const expected = {
        type: 'FETCH_PLANETS_SUCCESS',
        planets: [{ name: 'earth' }, { name: 'mars' }]
      }

      const result = actions.fetchPlanetsSuccess([{ name: 'earth' }, { name: 'mars' }]);
      expect(result).toEqual(expected)
    })
  })

  describe('fetchImagesSuccess', () => {
    it('should have a type of FETCH_IMAGES_SUCCESS', () => {
      const expected = {
        type: 'FETCH_IMAGES_SUCCESS',
        images: [{ href: 'some url' }, { href: 'another url' }]
      }

      const result = actions.fetchImagesSuccess([{ href: 'some url' }, { href: 'another url' }]);
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

  describe('setBodies', () => {
    it('should have a type of SET_BODIES', () => {
      const expected = {
        type: 'SET_BODIES',
        bodies: [{ name: 'sun' }, { name: 'moon' }]
      }
      
      const result = actions.setBodies([{ name: 'sun' }, { name: 'moon' }]);
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