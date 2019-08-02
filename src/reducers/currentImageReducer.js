const initialState = {items: [{href: ''}], href: ''}

export const currentImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_IMAGE_SUCCESS':
      return action.currentImage.collection;
    default:
      return state;
  }
}