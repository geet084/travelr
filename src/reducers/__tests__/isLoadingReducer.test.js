import { isLoadingReducer } from '../isLoadingReducer';
import * as actions from '../../actions';

describe('isLoadingReducer', () => {
  it('should return an inital state', () => {
    const expected = true;
    const result = isLoadingReducer(undefined, true);
    expect(result).toEqual(expected);
  })

  it('should set isLoading to false when done loading', () => {
    const initialState = true;
    const expected = false;
    const result = isLoadingReducer(initialState, actions.isLoading(false));
    expect(result).toEqual(expected);
  })
})