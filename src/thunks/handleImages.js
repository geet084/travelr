import { isLoading, hasErrored, handleImagesSuccess } from '../actions'

export const handleImages = (url) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const response = await fetch(url)
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(isLoading(false));
      const result = await response.json()
      dispatch(handleImagesSuccess(result.collection))
    } catch (error) {
      dispatch(hasErrored(error.message));
    }
  }
}