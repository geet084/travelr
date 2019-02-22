export const fetchPlanetsSuccessReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PLANETS_SUCCESS':
      return action.planets;
    default:
      return state;
  }
}