import { combineReducers } from 'redux';
import { isLoadingReducer } from './isLoadingReducer';
import { hasErroredReducer } from './hasErroredReducer';
import { fetchAPODSuccessReducer } from './fetchAPODSuccessReducer'
import { fetchPlanetsSuccessReducer } from './fetchPlanetsSuccessReducer'

export const rootReducer = combineReducers({
  isLoading: isLoadingReducer,
  hasErrored: hasErroredReducer,
  content: fetchAPODSuccessReducer,
  planets: fetchPlanetsSuccessReducer,
});