const initialState = {items: [{href: ''}], href: ''}
export const fetchImagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_IMAGES_SUCCESS':
      return action.images;
    default:
      return state;
  }
}