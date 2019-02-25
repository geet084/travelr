export const setBodiesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BODIES':
      return action.bodies;
    default:
      return state;
  }
}