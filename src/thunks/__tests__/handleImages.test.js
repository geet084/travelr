import { isLoading, hasErrored } from '../../actions'
import { handleImages } from '../handleImages';

describe('handleImages', () => {
  const mockURL = 'https://nasa';
  const mockDispatch = jest.fn();
  const mockResult = 'a NASA picture obj'

  it('should dispatch isLoading(true)', () => {
    const actionToDispatch = jest.fn()
    const thunk = handleImages(mockURL, actionToDispatch);
    thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })

  it('should dispatch hasErrored(message) if response is not OK', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'not OK'
    }));
    const actionToDispatch = jest.fn()
    const thunk = handleImages(mockURL, actionToDispatch);
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('not OK'));
  })

  it('should dispatch isLoading(false) if response is OK', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({ ok: true }));
    const actionToDispatch = jest.fn()
    const thunk = handleImages(mockURL, actionToDispatch);
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })

  it('should dispatch handleImagesuccess with the retrieved urls', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockResult),
      ok: true
    }));
    const actionToDispatch = jest.fn()
    const thunk = handleImages(mockURL, actionToDispatch);
    await thunk(mockDispatch)
    
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch(mockResult))
  })
})