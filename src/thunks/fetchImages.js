import { isLoading, hasErrored, fetchImagesSuccess } from '../actions'
const url = 'https://images-api.nasa.gov/asset/'

export const fetchImages = (arr) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      let imagesArr = arr.map(async id => {
        const response = await fetch(url + id)
        if (!response.ok) {
          throw Error(response.statusText);
        }
        let result = await response.json();
        return result.collection;
      })
      let images = await Promise.all(imagesArr)
      dispatch(isLoading(false));
      dispatch(fetchImagesSuccess(images))
    } catch (error) {
      dispatch(hasErrored(error.message));
    }
  }
}