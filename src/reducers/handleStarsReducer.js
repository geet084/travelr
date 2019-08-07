export const handleStarsReducer = (state = [], action) => {
  switch (action.type) {
    case 'HANDLE_STARS_SUCCESS':
      return action.stars;
    case 'HANDLE_OBJECT_IMAGES':
      let updatedState = [...state];
      return updatedState.map(star => {
        let images = action.objectImages.filter(img => img.object_id === star.id)
        star.images = images.map(img => img.image_id);
        return star
      })
    default:
      return state;
  }
}