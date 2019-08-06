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

export const handlePlanetsSuccess = (planets) => ({
  type: 'HANDLE_PLANETS_SUCCESS',
  planets
})

export const handleMoonsSuccess = (moons) => ({
  type: 'HANDLE_MOONS_SUCCESS',
  moons
})

export const handleStarsSuccess = (stars) => ({
  type: 'HANDLE_STARS_SUCCESS',
  stars
})

export const handleBodiesSuccess = (bodies) => ({
  type: 'HANDLE_BODIES_SUCCESS',
  bodies
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