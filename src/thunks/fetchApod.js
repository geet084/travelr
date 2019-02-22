import { isLoading, hasErrored, fetchApodSuccess } from '../actions'

export const fetchApod = (url) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(isLoading(false));
      const result = await response.json();
      dispatch(fetchApodSuccess(result))
    } catch (error) {
      dispatch(hasErrored(error.message))
    }
  }
}