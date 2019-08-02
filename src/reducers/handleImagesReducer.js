const initialState = { apod: {}, currentImage: {} }

export const handleImagesReducer = (state = initialState, action) => {
  switch (action.type) {
    // case 'HANDLE_IMAGES_SUCCESS':
    //   return action.images;
    case 'HANDLE_APOD_IMAGE':
      let updatedState = { ...state };
      updatedState.apod = action.apodImage
      return updatedState;
    default:
      return state;
  }
}