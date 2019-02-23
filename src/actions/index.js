
export const isLoading = (bool) => ({
  type: 'IS_LOADING',
  isLoading: bool
})

export const hasErrored = (message) => ({
  type: 'HAS_ERRORED',
  message
})

export const fetchApodSuccess = (content) => ({
  type: 'FETCH_APOD_SUCCESS',
  content
})

export const fetchPlanetsSuccess = (planets) => ({
  type: 'FETCH_PLANETS_SUCCESS',
  planets
})

export const fetchImagesSuccess = (images) => ({
  type: 'FETCH_IMAGES_SUCCESS',
  images
})