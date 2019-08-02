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

export const handleObjectsSuccess = (objects) => ({
  type: 'HANDLE_OBJECTS_SUCCESS',
  objects
})

export const handleImagesSuccess = (images) => ({
  type: 'HANDLE_IMAGES_SUCCESS',
  images
})

export const handleObjectImages = (objectImages) => ({
  type: 'HANDLE_OBJECT_IMAGES',
  objectImages
})

export const getImageSuccess = (currentImage) => ({
  type: 'GET_IMAGE_SUCCESS',
  currentImage
})

export const setArrivalTime = (arrivalTime) => ({
  type: 'SET_ARRIVAL_TIME',
  arrivalTime
})

export const setUserInfo = ({ userDate, elapsedDays }) => ({
  type: 'SET_USER_INFO',
  userDate,
  elapsedDays,
})