import { isLoading, hasErrored, fetchImagesSuccess } from '../actions'

export const fetchImages = (url) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const response = await fetch(url)
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(isLoading(false));
      const result = await response.json()
      dispatch(fetchImagesSuccess(result.collection))
    } catch (error) {
      dispatch(hasErrored(error.message));
    }
  }
}