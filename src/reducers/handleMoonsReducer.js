export const handleMoonsReducer = (state = [], action) => {
  switch (action.type) {
    case 'HANDLE_MOONS_SUCCESS':
      return action.moons;
    case 'HANDLE_OBJECT_IMAGES':
      let updatedState = [...state];
      return updatedState.map(moon => {
        let images = action.objectImages.filter(img => img.object_id === moon.id)
        moon.images = images.map(img => img.image_id);
        return moon
      })
    default:
      return state;
  }
}