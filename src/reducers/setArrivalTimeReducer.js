export const setArrivalTimeReducer = (state = 0, action) => {
  switch (action.type) {
    case 'SET_ARRIVAL_TIME':
      return action.arrivalTime;
    default:
      return state;
  }
}