export const handleImagesReducer = (state = [], action) => {
  switch (action.type) {
    case 'HANDLE_IMAGES_SUCCESS':
      return action.images;
    default:
      return state;
  }
}