import { handleMoonsReducer } from '../handleMoonsReducer';
import * as actions from '../../actions';

describe('handleMoonsReducer', () => {
  it('should return an initial state', () => {
    const expected = [];
    const result = handleMoonsReducer(undefined, []);
    expect(result).toEqual(expected);
  })

  it('should get all moons', () => {
    const initialState = [];
    const expected = [{ id: 4 }, { id: 7 }];

    const result = handleMoonsReducer(initialState, actions.handleMoonsSuccess([{ id: 4}, { id: 7 }]));
    expect(result).toEqual(expected);
  })

  it('should update moons with their images', () => {
    const initialState = [{ id: 4 }, { id: 8 }];
    const expected = [{ id: 4, images: ['img14', 'img23'] }, { id: 8, images: ['img14', 'img48'] }];

    const result = handleMoonsReducer(initialState, actions.handleObjectImages(
      [{ object_id: 4, image_id: 'img14' }, { object_id: 4, image_id: 'img23' }, { object_id: 8, image_id: 'img14' }, { object_id: 8, image_id: 'img48' }]
    ))

    expect(result).toEqual(expected);
  })
})