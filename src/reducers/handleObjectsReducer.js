export const handleObjectsReducer = (state = [], action) => {
  switch (action.type) {
    case 'HANDLE_OBJECTS_SUCCESS':
      return action.objects;
    case 'HANDLE_OBJECT_IMAGES':
      let updatedState = [...state];
      return updatedState.map(obj => {
        let images = action.objectImages.filter(img => img.object_id === obj.id)
        obj.images = images.map(img => img.image_id);
        return obj
      })
    default:
      return state;
  }
}