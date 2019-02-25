import { setArrivalTimeReducer } from '../setArrivalTimeReducer';
import * as actions from '../../actions';

describe('setArrivalTimeReducer', () => {
  it('should return an initial state', () => {
    const expected = 0;
    const result = setArrivalTimeReducer(undefined, 0);
    expect(result).toEqual(expected);
  })

  it('should set the arrival time of the user', () => {
    const initialState = 0;
    const expected = Date.now();
    const result = setArrivalTimeReducer(initialState, actions.setArrivalTime(Date.now()));
    expect(result).toEqual(expected);
  })
})