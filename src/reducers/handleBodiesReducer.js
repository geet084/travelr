export const handleBodiesReducer = (state = [], action) => {
  switch (action.type) {
    case 'HANDLE_BODIES_SUCCESS':
      return action.bodies;
    case 'HANDLE_OBJECT_IMAGES':
      let updatedState = [...state];
      return updatedState.map(body => {
        let images = action.objectImages.filter(img => img.object_id === body.id)
        body.images = images.map(img => img.image_id);
        return body
      })
    default:
      return state;
  }
}