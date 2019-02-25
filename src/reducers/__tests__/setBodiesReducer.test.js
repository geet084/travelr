import { setBodiesReducer } from '../setBodiesReducer';
import * as actions from '../../actions';

describe('setBodiesReducer', () => {
  it('should return an initial state', () => {
    const expected = [];
    const result = setBodiesReducer(undefined, []);
    expect(result).toEqual(expected);
  })

  it('should set bodies when called', () => {
    const initialState = [];
    const expected = [{name: 'sun'}, {name: 'moon'}];
    const result = setBodiesReducer(initialState, actions.setBodies([{ name: 'sun' }, { name: 'moon' }]));
    expect(result).toEqual(expected)
  })
})