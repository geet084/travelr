import { createStore } from 'redux';
import { rootReducer } from '../index';

describe('rootReducer', () => {
  let store = createStore(rootReducer)

  it('should set the store with an initial state', () => {
    let expected = {
      isLoading: true,
      hasErrored: '',
      objects: [],
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

  it('should dispatch objects action', () => {
    let action = { type: 'HANDLE_OBJECTS_SUCCESS', objects: [] }
    let expected = [];

    store.dispatch(action)
    expect(store.getState().objects).toEqual(expected)
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