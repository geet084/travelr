import { fetchImagesReducer } from '../fetchImagesReducer';
import * as actions from '../../actions';

describe('fetchImagesReducer', () => {
  it('should return an initial state', () => {
    const expected = [];
    const result = fetchImagesReducer(undefined, []);
    expect(result).toEqual(expected);
  })

  it('should fetch images', () => {
    const initialState = [];
    const expected = { url: 'mockURL' };
    const result = fetchImagesReducer(initialState, actions.fetchImagesSuccess({ url: 'mockURL' }))
    
    expect(result).toEqual(expected);
  })
})