const initialState = {items: [{href: ''}], href: ''}
export const handleImagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HANDLE_IMAGES_SUCCESS':
      return action.images;
    default:
      return state;
  }
}