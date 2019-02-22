import { isLoading, hasErrored, fetchPlanetsSuccess } from '../actions';

export const fetchPlanets = (url) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(isLoading(false));
      const result = await response.json();
      dispatch(fetchPlanetsSuccess(result.data))
    } catch (error) {
      dispatch(hasErrored(error.message));
    }
  }
}