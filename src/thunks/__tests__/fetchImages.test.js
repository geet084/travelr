import { isLoading, hasErrored, fetchImagesSuccess } from '../../actions'
import { fetchImages } from '../';

describe('fetchImages', () => {
  const mockURL = 'https://nasa';
  const mockDispatch = jest.fn();
  const mockIdArray = ['1', '2', '3']

  it('should dispatch isLoading(true)', () => {
    const thunk = fetchImages(mockIdArray);
    thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })

  it('should dispatch hasErrored(message) if response is not OK', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'not OK'
    }));
    const thunk = fetchImages(mockIdArray);
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('not OK'));
  })

  it.skip('should dispatch isLoading(false) if response is OK', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockURL),
      ok: true
    }));
    const thunk = fetchImages(mockIdArray);
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(isLoading('false'))
  })
})