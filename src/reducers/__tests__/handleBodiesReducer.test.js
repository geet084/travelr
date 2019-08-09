import { handleBodiesReducer } from '../handleBodiesReducer';
import * as actions from '../../actions';

describe('handleBodiesReducer', () => {
  it('should return an initial state', () => {
    const expected = [];
    const result = handleBodiesReducer(undefined, []);
    expect(result).toEqual(expected);
  });

  it('should get all bodies', () => {
    const initialState = [];
    const expected = [{ id: 3 }, { id: 9 }];

    const result = handleBodiesReducer(initialState, actions.handleBodiesSuccess([{ id: 3 }, { id: 9 }]));
    expect(result).toEqual(expected);
  });

  it('should update bodies with their images', () => {
    const initialState = [{ id: 3 }, { id: 9 }];
    const expected = [{ id: 3, images: ['img11', 'img01', 'img2'] }, { id: 9, images: ['img42'] }];

    const result = handleBodiesReducer(initialState, actions.handleObjectImages(
      [{ object_id: 3, image_id: 'img11' }, { object_id: 3, image_id: 'img01' }, { object_id: 3, image_id: 'img2' }, { object_id: 9, image_id: 'img42' }]
    ))
    
    expect(result).toEqual(expected);
  });
});