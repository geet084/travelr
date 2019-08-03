import { isLoading, hasErrored } from '../actions'

export const handleImages = (url, actionToDispatch) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const response = await fetch(url)
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(isLoading(false));
      const result = await response.json()
      dispatch(actionToDispatch(result))
    } catch (error) {
      dispatch(hasErrored(error.message));
    }
  }
}