import { combineReducers } from 'redux';
import { isLoadingReducer } from './isLoadingReducer';
import { hasErroredReducer } from './hasErroredReducer';
import { fetchApodReducer } from './fetchApodReducer'
import { fetchPlanetsReducer } from './fetchPlanetsReducer'

export const rootReducer = combineReducers({
  isLoading: isLoadingReducer,
  hasErrored: hasErroredReducer,
  content: fetchApodReducer,
  planets: fetchPlanetsReducer,
});