import { combineReducers } from 'redux';
import { isLoadingReducer } from './isLoadingReducer';
import { hasErroredReducer } from './hasErroredReducer';
import { fetchApodReducer } from './fetchApodReducer';
import { handleObjectsReducer } from './handleObjectsReducer';
import { handleImagesReducer } from './handleImagesReducer';
import { currentImageReducer } from './currentImageReducer';
import { setArrivalTimeReducer } from './setArrivalTimeReducer';
import { setUserInfoReducer } from './setUserInfoReducer'

export const rootReducer = combineReducers({
  isLoading: isLoadingReducer,
  hasErrored: hasErroredReducer,
  content: fetchApodReducer,
  objects: handleObjectsReducer,
  images: handleImagesReducer,
  currentImage: currentImageReducer,
  arrivalTime: setArrivalTimeReducer,
  userInfo: setUserInfoReducer,
});