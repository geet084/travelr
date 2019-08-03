import { isLoading, hasErrored, handleObjectsSuccess } from '../actions';

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
      dispatch(handleObjectsSuccess(result))
    } catch (error) {
      dispatch(hasErrored(error.message));
    }
  }
}