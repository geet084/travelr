import { isLoading, hasErrored, handlePlanetsSuccess, handleMoonsSuccess, handleStarsSuccess, handleBodiesSuccess } from '../actions';

export const handleObjects = (url) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(isLoading(false));
      const result = await response.json();
      dispatch(handlePlanetsSuccess(result.data.planets))
      dispatch(handleMoonsSuccess(result.data.moons))
      dispatch(handleStarsSuccess(result.data.stars))
      dispatch(handleBodiesSuccess(result.data.bodies))
    } catch (error) {
      dispatch(hasErrored(error.message));
    }
  }
}