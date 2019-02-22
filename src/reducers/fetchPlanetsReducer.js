export const fetchPlanetsReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PLANETS_SUCCESS':
      return action.planets;
    default:
      return state;
  }
}