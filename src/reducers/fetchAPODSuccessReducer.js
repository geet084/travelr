export const fetchAPODSuccessReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_APOD_SUCCESS':
      return action.content;
    default:
      return state;
  }
}