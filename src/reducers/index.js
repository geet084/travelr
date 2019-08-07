import { combineReducers } from 'redux';
import { isLoadingReducer } from './isLoadingReducer';
import { hasErroredReducer } from './hasErroredReducer';
import { handlePlanetsReducer } from './handlePlanetsReducer';
import { handleMoonsReducer } from './handleMoonsReducer';
import { handleStarsReducer } from './handleStarsReducer';
import { handleBodiesReducer } from './handleBodiesReducer';
import { handleImagesReducer } from './handleImagesReducer';
import { setArrivalTimeReducer } from './setArrivalTimeReducer';
import { setUserInfoReducer } from './setUserInfoReducer'

export const rootReducer = combineReducers({
  isLoading: isLoadingReducer,
  hasErrored: hasErroredReducer,
  planets: handlePlanetsReducer,
  moons: handleMoonsReducer,
  stars: handleStarsReducer,
  bodies: handleBodiesReducer,
  images: handleImagesReducer,
  arrivalTime: setArrivalTimeReducer,
  userInfo: setUserInfoReducer,
});