import { createStore } from 'redux';
import { rootReducer } from '../index';

describe('rootReducer', () => {
  let store = createStore(rootReducer)

  it('should set the store with an initial state', () => {
    let expected = {
      isLoading: true,
      hasErrored: '',
      content: {},
      planets: [],
      images: [],
      arrivalTime: 0,
      userInfo: { userDate: '', elapsedDays: 0 },
      bodies: [],
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

  it('should dispatch content action', () => {
    let action = {
      type: 'FETCH_APOD_SUCCESS',
      content: {}
    }
    let expected = {};

    store.dispatch(action)
    expect(store.getState().content).toEqual(expected)
  })

  it('should dispatch planets action', () => {
    let action = { type: 'FETCH_PLANETS_SUCCESS', planets: [] }
    let expected = [];

    store.dispatch(action)
    expect(store.getState().planets).toEqual(expected)
  })

  it('should dispatch images action', () => {
    let action = { type: 'FETCH_IMAGES_SUCCESS', images: [] }
    let expected = [];

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
    let expected = {userDate: '', elapsedDays: 0};
    
    store.dispatch(action)
    expect(store.getState().userInfo).toEqual(expected)
  })

  it('should dispatch setBodies action', () => {
    let action = { type: 'SET_BODIES', bodies: [] };
    let expected = []
    store.dispatch(action)
    expect(store.getState().bodies).toEqual(expected);
  })
})