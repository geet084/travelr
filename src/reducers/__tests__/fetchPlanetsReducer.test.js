import { fetchPlanetsReducer } from '../fetchPlanetsReducer';
import * as actions from '../../actions';

describe('fetchPlanetsReducer', () => {
  it('should return and initial state', () => {
    const expected = [];
    const result = fetchPlanetsReducer(undefined, []);
    expect(result).toEqual(expected);
  })

  it('should get all planets', () => {
    const initialState = [];
    const expected = [{ id: 1 }, { id: 2 }];

    const result = fetchPlanetsReducer(initialState, actions.fetchPlanetsSuccess([{ id: 1 }, { id: 2 }]));
    expect(result).toEqual(expected);
  })
})