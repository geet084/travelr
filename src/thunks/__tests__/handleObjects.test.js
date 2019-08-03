import { isLoading, hasErrored, handleObjectsSuccess } from '../../actions'
import { handleObjects } from '../handleObjects';

describe('handleObjects', () => {
  const mockURL = 'https://someurl';
  const mockDispatch = jest.fn();
  const mockObjects = [{}]
  
  it('should dispatch isLoading(true)', () => {
    const thunk = handleObjects(mockURL);
    thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true));
  })

  it('should dispatch hasErrored(message) if response is not OK', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'not OK'
    }));
    const thunk = handleObjects(mockURL);
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('not OK'))
  })

  it('should dispatch isLoading(false) if response is OK', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({ ok: true }));
    const thunk = handleObjects(mockURL);
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })

  it('should dispatch handleObjectsSuccess with the retrieved planets', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockObjects),
      ok: true
    }))
    const thunk = handleObjects(mockURL);
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(handleObjectsSuccess(mockObjects))
  })
})