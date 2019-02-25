import { fetchApodReducer } from '../fetchApodReducer'
import * as actions from '../../actions'

describe('fetchApodReducer', () => {
  it('should return an initial state', () => {
    const expected = {};
    const result = fetchApodReducer(undefined, {});
    expect(result).toEqual(expected)
  })

  it('should get an APOD', () => {
    const initialState = {};
    const expected = { url: 'mockurl' }
    
    const result = fetchApodReducer(initialState, actions.fetchApodSuccess({ url: 'mockurl' }))
    
    expect(result).toEqual(expected);
  })
})