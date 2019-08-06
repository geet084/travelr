export const handlePlanetsReducer = (state = [], action) => {
  switch (action.type) {
    case 'HANDLE_PLANETS_SUCCESS':
      return action.planets;
    case 'HANDLE_OBJECT_IMAGES':
      let updatedState = [...state];
      return updatedState.map(planet => {
        let images = action.objectImages.filter(img => img.object_id === planet.id)
        planet.images = images.map(img => img.image_id);
        return planet
      })
    default:
      return state;
  }
}