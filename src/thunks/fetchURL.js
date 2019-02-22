import { isLoading, hasErrored, fetchAPODSuccess } from '../actions'

export const fetchURL = (url) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(isLoading(false));
      const result = await response.json();
      dispatch(fetchAPODSuccess(result))
    } catch (error) {
      dispatch(hasErrored(error.message))
    }
  }
}