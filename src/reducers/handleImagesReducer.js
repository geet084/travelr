const initialState = { apod: {}, currentImage: { href: '' } };

export const handleImagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_IMAGE_SUCCESS':
      let imgState = { ...state };
      imgState.currentImage.href = action.currentImage.collection.items[0].href
      return imgState;
    case 'HANDLE_APOD_IMAGE':
      let updatedState = { ...state };
      updatedState.apod = action.apodImage
      return updatedState;
    default:
      return state;
  }
}