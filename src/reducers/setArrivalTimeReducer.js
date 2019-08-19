export const setArrivalTimeReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ARRIVAL_TIME':
      return action.arrivalTime;
    default:
      return state;
  }
}