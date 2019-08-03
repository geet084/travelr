import { handleObjectsReducer } from '../handleObjectsReducer';
import * as actions from '../../actions';

describe('handleObjectsReducer', () => {
  it('should return and initial state', () => {
    const expected = [];
    const result = handleObjectsReducer(undefined, []);
    expect(result).toEqual(expected);
  })

  it('should get all objects', () => {
    const initialState = [];
    const expected = [{ id: 1 }, { id: 2 }];

    const result = handleObjectsReducer(initialState, actions.handleObjectsSuccess([{ id: 1 }, { id: 2 }]));
    expect(result).toEqual(expected);
  })

  it('should update objects with their images', () => {
    const initialState = [{ id: 1 }, { id: 2 }];
    const expected = [{ id: 1, images: ['img1', 'img2'] }, { id: 2, images: ['img1', 'img5', 'img9'] }];

    const result = handleObjectsReducer(initialState, actions.handleObjectImages(
      [{ object_id: 1, image_id: 'img1' }, { object_id: 1, image_id: 'img2' }, { object_id: 2, image_id: 'img1' }, { object_id: 2, image_id: 'img5' }, { object_id: 2, image_id: 'img9' }]
    ))

    expect(result).toEqual(expected);
  })
})