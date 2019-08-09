import { handleStarsReducer } from '../handleStarsReducer';
import * as actions from '../../actions';

describe('handleStarsReducer', () => {
  it('should return an initial state', () => {
    const expected = [];
    const result = handleStarsReducer(undefined, []);
    expect(result).toEqual(expected);
  })

  it('should get all stars', () => {
    const initialState = [];
    const expected = [{ id: 6 }, { id: 11 }];

    const result = handleStarsReducer(initialState, actions.handleStarsSuccess([{ id: 6 }, { id: 11 }]));
    expect(result).toEqual(expected);
  })

  it('should update stars with their images', () => {
    const initialState = [{ id: 6 }, { id: 11 }];
    const expected = [{ id: 6, images: ['img13', 'img21'] }, { id: 11, images: ['img13', 'img55', 'img72'] }];

    const result = handleStarsReducer(initialState, actions.handleObjectImages(
      [{ object_id: 6, image_id: 'img13' }, { object_id: 6, image_id: 'img21' }, { object_id: 11, image_id: 'img13' }, { object_id: 11, image_id: 'img55' }, { object_id: 6, image_id: 'img72' }]
    ))

    expect(result).toEqual(expected);
  })
})