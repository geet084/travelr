import { hasErroredReducer } from '../hasErroredReducer';
import * as actions from '../../actions';

describe('hasErroredReducer', () => {
  it('should return an initial state', () => {
    const expected = '';
    const result = hasErroredReducer(undefined, '');
    expect(result).toEqual(expected);
  })

  it('should set an error message', () => {
    const initialState = [];
    const expected = 'something is wrong'; 
    const result = hasErroredReducer(initialState, actions.hasErrored('something is wrong'));
    expect(result).toEqual(expected);
  })
})