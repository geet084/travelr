import { isLoading, hasErrored, fetchApodSuccess } from '../../actions'
import { fetchApod } from '../'

describe('fetchApod', () => {
  const mockURL = 'https://nasa';
  const mockDispatch = jest.fn();
  const mockContent = 'a NASA picture obj'

  it('should dispatch isLoading(true)', () => {
    const thunk = fetchApod(mockURL);
    thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true));
  })

  it('should dispatch hasErrored(message) if response is not OK', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'not OK'
    }));
    const thunk = fetchApod(mockURL);
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('not OK'))
  })

  it('should dispatch isLoading(false) if response is OK', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({ ok: true }));
    const thunk = fetchApod(mockURL);
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })

  it('should dispatch fetchApodSuccess with the retrieved content', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockContent),
      ok: true
    }));
    const thunk = fetchApod(mockURL);
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(fetchApodSuccess(mockContent))
  })
})
