import { isLoading, hasErrored, handlePlanetsSuccess, handleMoonsSuccess, handleStarsSuccess, handleBodiesSuccess } from '../../actions'
import { handleObjects } from '../handleObjects';

describe('handleObjects', () => {
  const mockURL = 'https://someurl';
  const mockDispatch = jest.fn();
  const mockData = {
    data: {
      planets: [{ name: 'Earth', object_id: 5 }],
      stars: [{ name: 'Sun', object_id: 1 }],
      moons: [{ name: 'Moon', object_id: 8 }],
      bodies: [{ name: 'Oort Cloud', object_id: 11 }],
    }
  };

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

  it('should dispatch handlePlanetsSuccess with the retrieved planets', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
      ok: true
    }))
    const thunk = handleObjects(mockURL);
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(handlePlanetsSuccess(mockData.data.planets));
  })

  it('should dispatch handleStarsSuccess with the retrieved moons', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
      ok: true
    }))
    const thunk = handleObjects(mockURL);
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(handleStarsSuccess(mockData.data.stars));
  })

  it('should dispatch handleMoonsSuccess with the retrieved moons', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
      ok: true
    }))
    const thunk = handleObjects(mockURL);
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(handleMoonsSuccess(mockData.data.moons));
  })

  it('should dispatch handleBodiesSuccess with the retrieved moons', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
      ok: true
    }))
    const thunk = handleObjects(mockURL);
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(handleBodiesSuccess(mockData.data.bodies));
  })
})