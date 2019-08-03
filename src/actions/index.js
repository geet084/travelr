export const isLoading = (bool) => ({
  type: 'IS_LOADING',
  isLoading: bool
})

export const hasErrored = (message) => ({
  type: 'HAS_ERRORED',
  message
})

export const handleApodImage = (apodImage) => ({
  type: 'HANDLE_APOD_IMAGE',
  apodImage
})

export const handleObjectsSuccess = (objects) => ({
  type: 'HANDLE_OBJECTS_SUCCESS',
  objects
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