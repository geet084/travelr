export const fetchSuccessReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return action.content;
    default:
      return state;
  }
}