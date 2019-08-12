import { createStore } from 'redux';
import { rootReducer } from '../index';

describe('rootReducer', () => {
  let store = createStore(rootReducer)

  it('should set the store with an initial state', () => {
    let expected = {
      isLoading: true,
      hasErrored: '',
      stars: [],
      planets: [],
      moons: [],
      bodies: [],
      images: { "apod": {}, "currentImage": { "href": "" } },
      arrivalTime: 0,
      userInfo: { userDate: '', elapsedDays: 0 },
    }

    expect(store.getState()).toEqual(expected)
  })

  it('should dispatch isLoading action', () => {
    let action = { type: 'IS_LOADING', isLoading: false }
    let expected = false;

    store.dispatch(action)
    expect(store.getState().isLoading).toEqual(expected)
  })

  it('should dispatch hasErrored action', () => {
    let action = { type: 'HAS_ERRORED', message: 'test' }
    let expected = 'test';

    store.dispatch(action)
    expect(store.getState().hasErrored).toEqual(expected)
  })

  it('should dispatch planets action', () => {
    let action = { type: 'HANDLE_PLANETS_SUCCESS', planets: [] }
    let expected = [];

    store.dispatch(action)
    expect(store.getState().planets).toEqual(expected)
  })

  it('should dispatch moons action', () => {
    let action = { type: 'HANDLE_MOONS_SUCCESS', moons: [] }
    let expected = [];

    store.dispatch(action)
    expect(store.getState().moons).toEqual(expected)
  })

  it('should dispatch stars action', () => {
    let action = { type: 'HANDLE_STARS_SUCCESS', stars: [] }
    let expected = [];

    store.dispatch(action)
    expect(store.getState().stars).toEqual(expected)
  })

  it('should dispatch bodies action', () => {
    let action = { type: 'HANDLE_BODIES_SUCCESS', bodies: [] }
    let expected = [];

    store.dispatch(action)
    expect(store.getState().bodies).toEqual(expected)
  })

  it('should dispatch images action', () => {
    let action = { type: 'GET_IMAGE_SUCCESS', currentImage: { collection: { items: [{ href: '' }] } } }
    let expected = { "apod": {}, "currentImage": { "href": "" } };

    store.dispatch(action)
    expect(store.getState().images).toEqual(expected)
  })

  it('should dispatch arrivalTime action', () => {
    let action = { type: 'SET_ARRIVAL_TIME', arrivalTime: 0 }
    let expected = 0;

    store.dispatch(action)
    expect(store.getState().arrivalTime).toEqual(expected)
  })

  it('should dispatch userInfo action', () => {
    let action = { type: 'SET_USER_INFO', userDate: '', elapsedDays: 0 };
    let expected = { userDate: '', elapsedDays: 0 };

    store.dispatch(action)
    expect(store.getState().userInfo).toEqual(expected)
  })
})