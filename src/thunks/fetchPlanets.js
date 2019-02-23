import { isLoading, hasErrored, fetchPlanetsSuccess } from '../actions';
import addImageIds from '../utils/addImageIds'

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
      const planets = addImageIds(result.data)
      dispatch(fetchPlanetsSuccess(planets))
    } catch (error) {
      dispatch(hasErrored(error.message));
    }
  }
}