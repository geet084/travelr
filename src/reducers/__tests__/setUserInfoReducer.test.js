import { setUserInfoReducer } from '../setUserInfoReducer';
import * as actions from '../../actions';

describe('setUserInfoReducer', () => {
  it('should have an initial state', () => {
    const expected = { userDate: '', elapsedDays: 0 };
    const result = setUserInfoReducer(undefined, '');
    expect(result).toEqual(expected);
  })

  it('should set user info', () => {
    const initialState = { userDate: '', elapsedDays: 0 };
    const expected = { userDate: '2018-10-01', elapsedDays: 99 }
    const result = setUserInfoReducer(initialState, actions.setUserInfo({ userDate: '2018-10-01', elapsedDays: 99 }));
    expect(result).toEqual(expected);
  })
})