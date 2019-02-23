import { combineReducers } from 'redux';
import { isLoadingReducer } from './isLoadingReducer';
import { hasErroredReducer } from './hasErroredReducer';
import { fetchApodReducer } from './fetchApodReducer'
import { fetchPlanetsReducer } from './fetchPlanetsReducer'
import { fetchImagesReducer } from './fetchImagesReducer'

export const rootReducer = combineReducers({
  isLoading: isLoadingReducer,
  hasErrored: hasErroredReducer,
  content: fetchApodReducer,
  planets: fetchPlanetsReducer,
  images: fetchImagesReducer,
});