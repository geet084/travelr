import { handleImagesReducer } from '../handleImagesReducer';
import * as actions from '../../actions';

describe('handleImagesReducer', () => {
  it('should return an initial state', () => {
    const expected = { "apod": {}, "currentImage": { "href": "" } };
    const result = handleImagesReducer(undefined, []);
    expect(result).toEqual(expected);
  })

  it('should fetch current images', () => {
    const initialState = { "apod": {}, "currentImage": { "href": "" } }
    const expected = { "apod": {}, "currentImage": { "href": "mockURL" } };
    const result = handleImagesReducer(initialState, actions.getImageSuccess({ collection: { items: [{ href: 'mockURL' }] } }))

    expect(result).toEqual(expected);
  })

  it('should fetch apod images', () => {
    const initialState = { "apod": {}, "currentImage": { "href": "" } }
    const expected = { "apod": { url: 'mockURL' }, "currentImage": { "href": "" } }
    const result = handleImagesReducer(initialState, actions.handleApodImage({ url: 'mockURL' }))

    expect(result).toEqual(expected)
  })
})