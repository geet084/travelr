import { isLoading, hasErrored, fetchPlanetsSuccess } from '../../actions'
import { fetchPlanets } from '../';

describe('fetchPlanets', () => {
  const mockURL = 'https://someurl';
  const mockDispatch = jest.fn();
  const mockPlanets = [{}]
  
  it('should dispatch isLoading(true)', () => {
    const thunk = fetchPlanets(mockURL);
    thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true));
  })

  it('should dispatch hasErrored(message) if response is not OK', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'not OK'
    }));
    const thunk = fetchPlanets(mockURL);
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('not OK'))
  })

  it('should dispatch isLoading(false) if response is OK', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({ ok: true }));
    const thunk = fetchPlanets(mockURL);
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })

  it.skip('should dispatch fetchPlanetsSuccess with the retrieved planets', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockPlanets),
      ok: true
    }))
    const thunk = fetchPlanets(mockURL);
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(fetchPlanetsSuccess(mockPlanets))
  })
})